import streamlit as st
import pandas as pd
import datetime
import google.generativeai as genai

# --- CONFIGURATION ---
st.set_page_config(page_title="Gilchrist QC App", layout="wide", page_icon="🚧")

# API Key Setup (Ideally use st.secrets in production)
API_KEY = "AIzaSyCjAeRb0J5KkUv_IqqStcbjzrr9TQ_S1Ro" 
genai.configure(api_key=API_KEY)

# --- HELPER FUNCTIONS ---
def parse_station(val):
    if not val: return 0.0
    try:
        val = str(val).strip()
        if '+' in val:
            parts = val.split('+')
            return (float(parts[0]) * 100) + float(parts[1])
        return float(val)
    except:
        return 0.0

# --- SESSION STATE INITIALIZATION ---
if 'inspections' not in st.session_state:
    st.session_state.inspections = [
        {"id": 1, "title": "Foundation Concrete Pour", "location": "Building A", "date": "2025-11-29", "result": "Pass", "notes": "Met specs."}
    ]
if 'tests' not in st.session_state:
    st.session_state.tests = [
        {"id": 1, "title": "Concrete Break", "category": "Concrete", "value": "3250", "unit": "PSI", "result": "Pass"}
    ]
if 'soil_segments' not in st.session_state:
    st.session_state.soil_segments = []
if 'asphalt_segments' not in st.session_state:
    st.session_state.asphalt_segments = []
if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

# --- SIDEBAR NAVIGATION ---
st.sidebar.image("https://gilchristconstruction.com/wp-content/uploads/2018/11/Gilchrist_Logo.png", use_container_width=True)
st.sidebar.title("QC Manager")
page = st.sidebar.radio("Navigate", [
    "Dashboard", 
    "Soil Cement Calc", 
    "Asphalt Yield Calc", 
    "Inspections", 
    "Material Testing", 
    "AI Assistant",
    "LADOTD Resources"
])

# --- PAGE: DASHBOARD ---
if page == "Dashboard":
    st.title("🚧 Dashboard")
    
    # Metrics
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Total Inspections", len(st.session_state.inspections))
    col2.metric("Tests Completed", len(st.session_state.tests))
    
    fails = len([x for x in st.session_state.inspections if x['result'] == 'Fail'])
    col3.metric("Open Issues", fails, delta_color="inverse")
    
    pass_count = len([x for x in st.session_state.tests if x['result'] == 'Pass'])
    total = len(st.session_state.tests)
    rate = int((pass_count/total)*100) if total > 0 else 100
    col4.metric("Pass Rate", f"{rate}%")

    st.divider()
    st.subheader("Quick Links")
    c1, c2, c3 = st.columns(3)
    if c1.button("📋 New Inspection"): st.info("Go to Inspections tab to add new.")
    if c2.button("🧪 New Test"): st.info("Go to Material Testing tab to add new.")
    if c3.button("🤖 Ask AI"): st.info("Go to AI Assistant tab.")

# --- PAGE: SOIL CALC ---
elif page == "Soil Cement Calc":
    st.title("🚜 Soil Cement & Lime Calculator")
    
    with st.expander("Add New Pull/Segment", expanded=True):
        c1, c2, c3 = st.columns(3)
        material = c1.selectbox("Material", ["Cement", "Lime"])
        percent = c2.number_input("Percentage (%)", value=6.0)
        density = c3.number_input("Dry Density (pcf)", value=120.0)
        
        c4, c5 = st.columns(2)
        start_st = c4.text_input("Start Station (e.g. 100+00)")
        end_st = c5.text_input("End Station (e.g. 105+00)")
        
        c6, c7 = st.columns(2)
        width = c6.number_input("Width (ft)", value=24.0)
        depth = c7.number_input("Depth (in)", value=12.0)
        
        if st.button("Add Segment"):
            length = abs(parse_station(end_st) - parse_station(start_st))
            if length == 0: length = 1.0 # prevent divide by zero
            
            # Calculations
            vol_cf = length * width * (depth / 12)
            total_lbs = vol_cf * density * (percent / 100)
            tons = total_lbs / 2000
            spread = total_lbs / ((length * width) / 9)
            
            new_seg = {
                "Material": material,
                "Station": f"{start_st} to {end_st}",
                "Dimensions": f"{length}' x {width}' x {depth}\"",
                "Tons": round(tons, 2),
                "Spread Rate": round(spread, 1)
            }
            st.session_state.soil_segments.append(new_seg)
            st.success("Segment Added")

    if st.session_state.soil_segments:
        st.write("### Calculated Segments")
        df = pd.DataFrame(st.session_state.soil_segments)
        st.table(df)
        total_tons = df["Tons"].sum()
        st.header(f"Total Required: {total_tons} Tons")
        
        if st.button("Clear List"):
            st.session_state.soil_segments = []
            st.rerun()

# --- PAGE: ASPHALT CALC ---
elif page == "Asphalt Yield Calc":
    st.title("🚛 Asphalt Yield Calculator")
    
    with st.expander("Add Paving Pull", expanded=True):
        c1, c2 = st.columns(2)
        start_st = c1.text_input("Start Station")
        end_st = c2.text_input("End Station")
        
        c3, c4, c5 = st.columns(3)
        width = c3.number_input("Width (ft)", value=12.0)
        thick = c4.number_input("Thickness (in)", value=2.0)
        yield_val = c5.number_input("Yield (lbs/sy-in)", value=110.0)
        
        if st.button("Add Pull"):
            length = abs(parse_station(end_st) - parse_station(start_st))
            sy = (length * width) / 9
            lbs = sy * thick * yield_val
            tons = lbs / 2000
            
            new_pull = {
                "Station": f"{start_st} to {end_st}",
                "Length": length,
                "SY": round(sy, 1),
                "Tons": round(tons, 2)
            }
            st.session_state.asphalt_segments.append(new_pull)
            st.success("Added")

    if st.session_state.asphalt_segments:
        df = pd.DataFrame(st.session_state.asphalt_segments)
        st.table(df)
        st.header(f"Total: {df['Tons'].sum()} Tons")
        if st.button("Clear Asphalt List"):
            st.session_state.asphalt_segments = []
            st.rerun()

# --- PAGE: INSPECTIONS ---
elif page == "Inspections":
    st.title("📋 Field Inspections")
    
    with st.form("new_insp"):
        st.subheader("New Inspection Log")
        c1, c2 = st.columns(2)
        title = c1.text_input("Title")
        loc = c2.text_input("Location")
        c3, c4 = st.columns(2)
        res = c3.selectbox("Result", ["Pass", "Fail", "Pending"])
        date = c4.date_input("Date")
        notes = st.text_area("Notes")
        
        if st.form_submit_button("Save Inspection"):
            st.session_state.inspections.append({
                "id": len(st.session_state.inspections)+1,
                "title": title,
                "location": loc,
                "result": res,
                "date": str(date),
                "notes": notes
            })
            st.success("Saved!")
            st.rerun()
            
    st.divider()
    for i in st.session_state.inspections:
        color = "green" if i['result'] == 'Pass' else "red" if i['result'] == 'Fail' else "orange"
        with st.container():
            st.markdown(f"### {i['title']} :{color}[{i['result']}]")
            st.caption(f"{i['date']} | {i['location']}")
            st.write(i['notes'])
            st.divider()

# --- PAGE: MATERIAL TESTING ---
elif page == "Material Testing":
    st.title("🧪 Material Testing Log")
    
    with st.form("new_test"):
        c1, c2 = st.columns(2)
        cat = c1.selectbox("Category", ["Concrete", "Soil", "Asphalt"])
        val = c2.text_input("Value (e.g. 3000)")
        unit = st.selectbox("Unit", ["PSI", "PCF", "%", "Inches"])
        res = st.selectbox("Result", ["Pass", "Fail"])
        
        if st.form_submit_button("Log Test"):
            st.session_state.tests.append({
                "category": cat,
                "value": val,
                "unit": unit,
                "result": res
            })
            st.success("Logged!")
            st.rerun()
            
    st.dataframe(pd.DataFrame(st.session_state.tests), use_container_width=True)

# --- PAGE: AI ASSISTANT ---
elif page == "AI Assistant":
    st.title("🤖 QC AI Assistant")
    st.caption("Powered by Google Gemini - Ask about specs, TR procedures, or math.")
    
    for msg in st.session_state.chat_history:
        with st.chat_message(msg["role"]):
            st.write(msg["text"])
            
    if prompt := st.chat_input("Ask a question..."):
        st.session_state.chat_history.append({"role": "user", "text": prompt})
        with st.chat_message("user"):
            st.write(prompt)
            
        with st.chat_message("assistant"):
            try:
                model = genai.GenerativeModel('gemini-1.5-flash')
                response = model.generate_content(prompt)
                st.write(response.text)
                st.session_state.chat_history.append({"role": "assistant", "text": response.text})
            except Exception as e:
                st.error(f"Error: {e}")

# --- PAGE: RESOURCES ---
elif page == "LADOTD Resources":
    st.title("📚 LADOTD Links")
    links = {
        "Testing Procedures Manual": "https://dotd.la.gov/about/office-of-project-delivery/engineering/materials-and-testing/testing-procedure-manual/",
        "QA Manual for Asphalt": "https://dotd.la.gov/media/gaeknov2/qa-manual-for-asphalt-pavements-2018-spec-revision.pdf",
        "Construction Specs": "https://dotd.la.gov/about/office-of-project-delivery/engineering/construction/"
    }
    for name, url in links.items():
        st.markdown(f"🔗 **[{name}]({url})**")
```

### Step 2: Upload it
1.  Run the commands in your terminal:
    ```powershell
    git add app.py
    git commit -m "Rewrite app in Python"
    git push
    ```

### Step 3: Check requirements
Make sure your `requirements.txt` includes these (if you haven't done this yet, do it now):
1.  Open `requirements.txt`
2.  Make sure it has:
    ```text
    streamlit
    pandas
    google-generativeai
