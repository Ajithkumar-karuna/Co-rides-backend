const express = require("express");
const app = express.Router();
const db = require("../db/db");
  

app.get("/user_details", (req, res) => {
    const userId = req.params.user_id;
  
  
    const query = `
        SELECT
          u.*,
          e.*,
          a.*
        FROM mas_user AS u
        LEFT JOIN mas_user_emg_Contact AS e ON u.user_id = e.user_id
        LEFT JOIN mas_UserAddress AS a ON u.user_id = a.user_id
       
      `;
  
    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error("Error retrieving user details:", error);
        res.status(500).json({ status: "error", message: "An error occurred" });
      } else if (results.length === 0) {
        res.status(404).json({ status: "error", message: "User not found" });
      } else {
        res.status(200).json({ status: "success", results });
      }
    });
  });
  
  app.get('/totaluser', (req, res) => {
    const query = 'SELECT user_id, first_Name, last_Name, MobileNo,gender, Referal_Code FROM mas_user';
  
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
  
      res.json(results);
    });
  });
  
  app.get("/totalUserCount", (req, res) => {
    const countUsersQuery = "SELECT COUNT(DISTINCT user_id) AS totalUsers FROM mas_user";
  
    db.query(countUsersQuery, (error, results) => {
      if (error) {
        console.error("Error counting users:", error);
        res.status(500).json({ status: "error", message: "An error occurred" });
      } else {
        const totalUsers = results[0].totalUsers;
        res.status(200).json({
          status: "success",
          message: "Total number of users",
          totalUsers: totalUsers,
        });
      }
    });
  });
  
  
  app.get("/pendingUsers", (req, res) => {
    const selectQuery = "SELECT * FROM mas_user WHERE profile_Image ||  Emergency_No IS NULL";
  
    db.query(selectQuery, (error, results) => {
      if (error) {
        console.error("Error retrieving user data:", error);
        return res.status(500).json({ status: "error", message: "An error occurred" });
      }
  
      const pendingUsers = results.length;
  
      res.status(200).json({
        status: "success",
        message: "Total pending users without profile image",
        pendingUsersCount: pendingUsers,
      });
    });
  });
  
  app.get("/freshUsers", (req, res) => {
    const currentDate = new Date();
    const fifteenMinutesAgo = new Date(currentDate.getTime() - 60 * 60 * 1000);
  
    const selectQuery = `
      SELECT COUNT(*) AS freshUsers 
      FROM mas_user 
      WHERE Date_time >= ?;
    `;
  
    db.query(selectQuery, [fifteenMinutesAgo], (error, results) => {
      if (error) {
        console.error("Error counting fresh users:", error);
        res.status(500).json({ status: "error", message: "An error occurred" });
      } else {
        const freshUsers = results[0].freshUsers;
        res.status(200).json({
          status: "success",
          message: "Total number of fresh users in the last 15 minutes",
          freshUsers: freshUsers,
        });
      }
    });
  });

module.exports=app;