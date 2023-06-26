const express = require('express');
const router = express.Router();
const fetch = require("node-fetch").default;

const syncID = '1378170'
const baseURL = `https://api.hightouch.com/api/v1/syncs/${syncID}/trigger`
const API_KEY = "7e5cc938-6734-48be-b41b-b483427d5be9"
// Trigger Airtable Sync
router.post('/trigger-sync', async (req, res) => {
    const response = await fetch(baseURL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-type": "application/json",
        },
       
    });
    if (response.status === 200) {
        const data = await response.json();
        res.json(data);
    }
    else {
        res.json({
            error: 'Failed to trigger sync',
            statusCode: response.status,
            messasge: response.statusText
        })
    }
})

module.exports = router

