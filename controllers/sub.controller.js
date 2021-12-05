const db = require("../models");
const Sub = db.subs;
const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

const listId = "4a60bf300c";

mailchimp.setConfig({
    apiKey: "7206d29324c991a2ea013df0b0c190db-us20",
    server: "us20",
  });
  
exports.create = (req, res) => {

async function run() {
  try{
  const response = await mailchimp.lists.addListMember(listId, {
  email_address: req.body.email_address,
status: "subscribed"});
    res.send("Successfully added contact to the list. The contact's id is " + response.id);
  }
  catch(error) {
      res.status(400).send(error.message);
  
  }  }
  run();

};

exports.check = (req, res) => {

  email_address = req.body.email_address;

const subscriberHash = md5(email_address.toLowerCase());

async function run() {
  try {
    const response = await mailchimp.lists.getListMember(
      listId,
      subscriberHash
    );

    res.send("This user's subscription status is " + response.status);

  } catch (e) {
    if (e.status === 404) {
      res.status(400).send(e.message);
    }
  }
}
run();

  
  };
