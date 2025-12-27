const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://aiton1106_db_user:Ai1106to@cluster0.lsufkms.mongodb.net/economyRPG?retryWrites=true&w=majority')
  .then(() => console.log('MongoDBに接続成功！'))
  .catch(error => console.error('MongoDB接続エラー詳細:', error));

const PlayerSchema=new mongoose.Schema({
    money:Number
});
const Player=mongoose.model('Player',PlayerSchema);

app.post('/save',async(req,res)=>{
    try{
        console.log('受信したデータ：',req.body);

        await Player.findOneAndUpdate({},{money:req.body.money},{upsert:true});
    }catch(error){
        res.status(500).json({error:'保存失敗'});
    }
});

app.listen(3000,()=>console.log('Server is running'));