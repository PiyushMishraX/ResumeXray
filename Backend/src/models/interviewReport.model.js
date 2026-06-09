const mongoose = require('mongoose');

// User and AI 
/**
 * - job description schema :String
 * - resume text :String
 * - self description :String
 * 
 * - matchScore : Number
 * 
 * - Techincal questions :
 *          [{
 *              questions : ""
 *              intention : ""
 *              answer : ""
 *          }]
 * - Behavioral questions :
  *          [{
 *              questions : ""
 *              intention : ""
 *              answer : ""
 *          }]
 * - skill gaps : [{
 *              skll : ""
 *              severity : {
 *                  type : String,
 *                  enum : ["low", "medium", "high"]
 *              }
 * }]
 * - preparation plan :[{
 *              day : Number,
 *              focus : String,
 *              tasks : [String],
 * 
 * }]
 * 
 */
