const express = require("express");
const { verifyWebhook,receiveWebhook,sendTestLead } = require("../controllers/webhookController");
const router = express.Router();

router.get("/", verifyWebhook);
router.post("/", receiveWebhook);
router.post("/test-lead", sendTestLead);
module.exports = router;