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


const interviewReportSchema = new mongoose.Schema({
    jobDescritption: {
        type: String,
        require: [ true, "Job description is required" ]
    },
    // any one of the resume or self description is necessary
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    // technicalQuestions: // using subSchema // in array format because this fields can have multiple values of subSchemas
    technicalQuestions: [  ],
    behavioralQuestions : [  ],
    skillGaps: [  ],
    preparationPlan: [  ]

})