const PermissionLevelController = require('./permissionLevelController')
const constants = require('../configurations/constants')

const dashDao = require('../model/dao/dashDao')

const MetricsController = {}

MetricsController.GenerateDash = (req,res) =>{

}

MetricsController.DashToPayload = (req, res) =>{
    let pr = []
    pr.push(dashDao.GetById(":0:"))
    pr.push(dashDao.GetById(":1:"))
    pr.push(dashDao.GetById(":5:"))
    pr.push(dashDao.GetById(":11:"))

    Promise.all(pr)
    .then(r=>{
        let result = r.map(r=>r.data)
        res.send(result)
    })
    .catch(e=>res.send(e))
}

MetricsController.getPatients = (req, res) =>{
    dashDao.GetPatients()
    .then(r=>{
        if(r.success){
            data = r.data.pop()
            res.send({forwards: [r.data.ecn, 150, 60], total: data.total, waiting: 50, current: 2})
        }
        else
            res.send({success:false})
    })
    .catch(e=>{
        res.send({success:false})
    })
}

MetricsController.getAgeRange = (req, res) =>{
    res.send({
        male: 30,
        female: 40,
        total: 70,
        xAxisData: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69' , '70+'],
        seriesMaleData: [20, 30, 40, 10, 30, 10,10,10],
        seriesFemaleData: [10, 10, 60, 10, 30, 1,2,3],
    })
}

MetricsController.getClinicalCondition = (req, res) =>{
    res.send({
        highRisk: 56,
        highRiskAverageAge: 36.77,
        lowRisk: 14,
        lowRiskAverageAge: 39.62,
        xAxisData: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69' , '70+'],
        highRiskData: [20, 30, 40, 50, 70, 10,10,10],
        lowRiskData: [10, 10, 60, 10, 30, 1,2,3],
        factors: [5, 2, 50, 60, 60, 30, 4, 5, 40, 56, 40, 10],
        situations: [2, 10, 1, 50, 3, 15, 3, 14, 30, 4],
        medications: [10, 5, 30, 5]
    })
}

MetricsController.getTotalAttendances = (req, res) =>{
    res.send({
        totalAttendances: 1500,
        monthlyAttendances: 150,
        weeklyAttendances: 50,
        dailyAttendances: 10,
        days: [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        attendancesPerDay: [30, 10, 30, 85, 14, 0, 0, 0, 0, 0, 1, 12, 3, 1, 5, 1, 17, 8, 19, 0, 2, 22, 3, 24, 25, 6, 7, 2, 2, 0, 3],
        attendancesPerWeek: [50, 20, 40, 70, 10, 0, 0],
        attendancesPerMonth: [50, 150, 300, 150, 0, 0, 0, 0, 0, 0, 0, 0]
    })
}

MetricsController.getDoctors = (req, res) =>{
    res.send({
        total: 10,
        inService: 4,
        students: 6,
        monthlyAttendances: [30, 10, 30, 85, 14, 50],
        totalAttendances: [80, 70, 60, 125, 34, 150]
    })
}

MetricsController.getGeneral = (req, res) =>{
    res.send({
        fever: 20,
        shortnessOfBreath: 15,
        dyspnoea: 10,
        dryCough: 242,
        male: 150,
        female: 280,
        balance: [56, 14],
        age: [2, 5, 900, 70, 30, 50, 75, 150],
        attendances: 981,
        patients: 1010,
        videoAttendances: 50,
        professionals: 10
    })
}

module.exports = MetricsController

