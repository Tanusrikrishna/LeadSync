const {processLeadEvent} = require("../services/leadService");

const {getIO}= require("../socket/socket");

function verifyWebhook(req, res) {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("Webhook verified successfully");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
}


async function receiveWebhook(req, res) {
  try {
    console.log("Webhook received:");
    console.log(JSON.stringify(req.body, null, 2));
    const leads = await processLeadEvent(req.body);
    const io = getIO();

    for (const lead of leads) {
      io.emit("newLead", lead);
    }

    return res.sendStatus(200);
  } 
  catch (error) {
    console.error("Webhook processing error:", error);
    return res.sendStatus(500);
  }
}

function sendTestLead(req, res) {
  try {
    const io = getIO();

    const {
      name,
      email,
      phone
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "name, email and phone are required"
      });
    }

    const testLead = {
      id: `TEST-${Date.now()}`,
      leadgen_id: `TEST-${Date.now()}`,
      createdTime: new Date().toISOString(),
      name,
      email,
      phone
    };

    console.log("Sending test lead:");
    console.log(testLead);

    io.emit("newLead", testLead);

    return res.status(200).json({
      success: true,
      message: "Test lead sent successfully",
      lead: testLead
    });

  } catch (error) {
    console.error("Test lead error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send test lead"
    });
  }
}

module.exports = {verifyWebhook,receiveWebhook,sendTestLead};