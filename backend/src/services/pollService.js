const axios = require("axios");
const { getIO } = require("../socket/socket");

const seen = new Set();
let firstRun = true;

async function pollLeads() {
  try {
    const url = `https://graph.facebook.com/${process.env.META_GRAPH_API_VERSION}/${process.env.META_FORM_ID}/leads`;
    const { data } = await axios.get(url, {
      params: {
        fields: "id,created_time,field_data",
        access_token: process.env.META_ACCESS_TOKEN,
      },
    });

    for (const item of data.data || []) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      if (firstRun) continue; // ignore leads that existed before startup

      const f = {};
      (item.field_data || []).forEach((x) => (f[x.name] = x.values[0]));

      const lead = {
        id: item.id,
        leadgen_id: item.id,
        createdTime: item.created_time,
        name: f.full_name,
        email: f.email,
        phone: f.phone_number,
      };

      console.log("Polled new lead:", lead);
      getIO().emit("newLead", lead);
    }
    firstRun = false;
  } catch (err) {
    console.error("Poll error:", err.response?.data || err.message);
  }
}

function startPolling() {
  pollLeads();
  setInterval(pollLeads, 15000);
}

module.exports = { startPolling };