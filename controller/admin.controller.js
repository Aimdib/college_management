const db = require("../models");
const jwt = require("jsonwebtoken");
const student =db.student
const comptition =db.comptiton
const college =db.college
const participations =db.participation
const helper = require("../helper/helper");


exports.createCollege =async (req,res)=>{
    const userData = await helper.validateAdmin(req);
    if (userData.roleId !== 1) {
        return res.status(403).json({
            message: "Permission denied!",
            success: false,
            data: null,
        });
    }
    
    if (userData.roleId !== 1) {
        return res.status(403).json({
            message: "Permission denied!",
            success: false,
            data: null,
        });
    }
    if (!userData.token) {
        return res.status(404).json({
            message: "Token invalid!",
            success: false,
            data: null,
        });
    }
try {

    await college.create(req.body).then((data)=>{
        return res.status(200).send({
            success:true,
            message:"created sucessfully!",
            data:data
        })
    })
    
} catch (error) {
    return res.status(500).json({
        success: false,
        message: e.message,
        data: null,
      });
}
}

exports.createContest =async(req,res)=>{
    const userData = await helper.validateAdmin(req);

    if (userData.roleId !== 1) {
        return res.status(403).json({
            message: "Permission denied!",
            success: false,
            data: null,
        });
    }
    if (!userData.token) {
        return res.status(404).json({
            message: "Token invalid!",
            success: false,
            data: null,
        });
    }
    try {
        const data = await comptition.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Created successfully!",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
    
}

exports.joinContest = async (req, res) => {
    try {
        const userData = await helper.validateAdmin(req);
        if (userData.roleId !== 2) {
            return res.status(403).json({
                message: "Permission denied!",
                success: false,
                data: null,
            });
        }
        
        if (!userData.token) {
            return res.status(404).json({
                message: "Token invalid!",
                success: false,
                data: null,
            });
        }

        const competitionIds = req.body.competitionIds; 

        if (!Array.isArray(competitionIds)) {
            return res.status(400).json({
                message: "Competition IDs should be provided as an array!",
                success: false,
                data: null,
            });
        }

        for (let i = 0; i < competitionIds.length; i++) {
            const obj = {
                competitionId: competitionIds[i],
                studentId: userData.id,
            };
            await participations.create(obj);
        }

        return res.status(200).json({
            success: true,
            message: "Joined!",
            data: null,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};
