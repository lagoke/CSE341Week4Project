const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users]
    const result = await mongodb.getDatabase().db().collection('attendance').find();
    result.toArray().then((attendance) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(attendance); 

    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users]
    const result = await mongodb.getDatabase().db().collection('attendance').find();
    result.toArray().then((attendance) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(attendance[0]); // we just need the first one (the only one)

    });

};

const createAttendance = async (req, res) => {
    //#swagger.tags=['Users]
    const new_attendance = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
        service_name:req.body.service_name,
        date:req.body.date,
        sign_in:req.body.sign_in,
        sign_out:req.body.sign_out
        
        
};
  

try{
const response = await mongodb.getDatabase().db().collection('attendance').insertOne(new_attendance);
if(response.acknowledged){
    console.log(response.insertedId);
    res.status(200).json(respnse);
}

} // closes the try section

catch(error) {
    res
    .status(500)
    .json(response.error || 'Some error occured while creating the attendance');
   
}
};



const updateAttendance = async (req, res) => {
 //#swagger.tags=['Users]
    const attendanceId = new ObjectId(req.params.id);
    const attendance = {
    
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
        service_name:req.body.service_name,
        date:req.body.date,
        sign_in:req.body.sign_in,
        sign_out:req.body.sign_out
        
    
};
    const response = await mongodb.getDatabase().db().collection('attendance').replaceOne({_id: attendanceId} , attendance);
    if(response.modifiedCount > 0){
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || 'Some error occured while updating the attendance');
    
    }
    
    
    };
    

    const deleteAttendance = async (req, res) => {
         //#swagger.tags=['Users]
        const attendanceId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('attendance').deleteOne({_id: attendanceId});
        if (response.deleteCount > 0){
            res.status(204).send();
        }else {
            res.status(500).json(response.error || 'Some error occured while delete the attendance.');
        }
        
        };
        


module.exports = { 
    getAll,
    getSingle,
    createAttendance,
    updateAttendance,
    deleteAttendance
};