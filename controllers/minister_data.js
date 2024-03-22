const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users]
    const result = await mongodb.getDatabase().db().collection('Minister').find();
    result.toArray().then((minister) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(minister); 

    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users]
    const result = await mongodb.getDatabase().db().collection('Minister').find();
    result.toArray().then((minister) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(minister[0]); // we just need the first one (the only one)

    });

};

const createminister = async (req, res) => {
    //#swagger.tags=['Users]
    const new_minister = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
        service_assigned:req.body.service_assigned,
        date_ordained:req.body.date_ordained,
        weekly_officiating_frequency:req.body.weekly_officiating_frequency
       
        
        
};
  

try{
const response = await mongodb.getDatabase().db().collection('minister').insertOne(new_minister);
if(response.acknowledged){
    console.log(response.insertedId);
    res.status(200).json(respnse);
}

} // closes the try section

catch(error) {
    res
    .status(500)
    .json(response.error || 'Some error occured while creating the minister');
   
}
};



const updateminister = async (req, res) => {
 //#swagger.tags=['Users]
    const ministerId = new ObjectId(req.params.id);
    const minister = {
    
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
        service_assigned:req.body.service_assigned,
        date_ordained:req.body.date_ordained,
        weekly_officiating_frequency:req.body.weekly_officiating_frequency
        
    
};
    const response = await mongodb.getDatabase().db().collection('minister').replaceOne({_id: ministerId} , minister);
    if(response.modifiedCount > 0){
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || 'Some error occured while updating the minister');
    
    }
    
    
    };
    

    const deleteminister = async (req, res) => {
         //#swagger.tags=['Users]
        const ministerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('minister').deleteOne({_id: ministerId});
        if (response.deleteCount > 0){
            res.status(204).send();
        }else {
            res.status(500).json(response.error || 'Some error occured while deleting the minister.');
        }
        
        };
        


module.exports = { 
    getAll,
    getSingle,
    createminister,
    updateminister,
    deleteminister
};