async function processLeadEvent(body) {
  const leads= [];

  if (!body.entry) {
    return leads;
  }

  for (const entry of body.entry) {
    if (!entry.changes) {
      continue;
    }

    for (const change of entry.changes) {
      if (change.field !== "leadgen") {
        continue;
      }
      const leadgenId = change.value?.leadgen_id;
      if (!leadgenId) {
        continue;
      }

      const lead = await getLeadDetails(leadgenId);
      if (lead) {
        leads.push(lead);
      }
    }
  }

  return leads;
}

async function getLeadDetails(leadgenId) {
  const version= process.env.META_GRAPH_API_VERSION;
  const accessToken= process.env.META_ACCESS_TOKEN;

  const url =
    `https://graph.facebook.com/${version}/${leadgenId}` +
    `?access_token=${accessToken}`;

  const response= await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    console.error("Meta API error:", data);
    throw new Error("Failed to fetch lead details");
  }

  const lead = {
    id: data.id,
    createdTime: data.created_time,
    fields: {},
  };

  if (Array.isArray(data.field_data)) {
    for (const field of data.field_data) {
      lead.fields[field.name] = field.values?.[0] ?? "";
    }
  }

  return lead;
}

module.exports = {processLeadEvent};