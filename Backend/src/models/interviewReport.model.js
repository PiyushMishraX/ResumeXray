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

const TechincalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [ true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [ true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [ true, "Answer is required"]
    },
}, {
    _id: false, // we do not need id because we aren't storing this schema seperately but in interviewReport Schema as subSchema
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [ true, "Behviroal question is required"]
    },
    intention: {
        type: String,
        required: [ true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [ true, "Answer is required"]
    },
}, {
    _id: false, 
})

const skillGapsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [ true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: [ "low", "medium", "high"],
        required: [ true, "Severity is required"]
    }
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [ true, "Day is required" ]
    },
    focus: {
        type: String,
        reuqired: [ true, "Focus is required" ]
    },
    tasks: [ {
        type: String,
        required: [ true, "Task is required"]
    } ]
}, {
    _id: false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
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
    technicalQuestions: [ TechincalQuestionSchema ],
    behavioralQuestions : [ behavioralQuestionSchema ],
    skillGaps: [ skillGapsSchema ],
    preparationPlan: [ preparationPlanSchema ],
    user: { // to tell data saved is of which user
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: [ true, "Job title is required"]
    }

}, {
    timestamps: true // to record createAt time and change/modification time
})

const interviewReportModel = mongoose.model( "InterviewReport", interviewReportSchema );

module.exports = interviewReportModel;