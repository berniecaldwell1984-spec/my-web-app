import streamlit as st

st.set_page_config(page_title="Gilchrist QC", layout="wide")

st.title("Gilchrist Construction QC App")

# Simple status display
st.header("Project Status")
col1, col2 = st.columns(2)

with col1:
    st.info("Test Results: PENDING")
    
with col2:
    st.success("System: ONLINE")

st.write("---")
st.write("Quality Control Data Input")
# A simple input to show it works
sample_id = st.text_input("Enter Sample ID")

if sample_id:
    st.write(f"Logging data for sample: {sample_id}")
