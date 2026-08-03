import express from 'express';
import Thread from '../models/Thread.js';

const router = express.Router();

// test
router.post('/test', async (req, res)=>{
     try {
        const thread = new Thread({
            threadId: "xyz",
            title: "testing new thread"
        });

        const response = await thread.save();
        res.send(response);
     } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to save in DB"
        })
     }
});

// Get all threads
router.get('/thread', async (req, res)=>{
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1});// This will also does sort in desending order
        res.json(threads);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to fetch threads"
        })
    }
});

// get a singal thread based on threadId
router.get('/thread/:threadId', async (req, res)=>{
        const {threadId} = req.params;
    try {
        const thread = await Thread.findOne({ threadId });

        if(!thread){
            res.status(404).json({
                error: "thread not found"
            })
        }
        res.json(thread.messages);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to delete chat"
        })
    }
});

// find one thread and delete

router.delete('/thread/:threadId', async (req, res)=>{
        const {threadId} = req.params;
    try {
         const threadDelete = await Thread.findOneAndDelete({ threadId });

         if(!threadDelete){
            res.status(404).json({
                error: "thread not found"
            })
         }

         res.status(200).json({ message: "Thread delete sucessfull!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Thread not found"
        })
    }

});

// POST the chat
router.post('/chat', async (req,res)=>{

    const {threadId, message} = req.body;

    if(!threadId || !message){
        res.status(400).json({
            error: "Required field missing"
        })
    }
    try {
        
        const thread = await Thread.findOne({ threadId });
        
        if(!thread){
            
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            })
        }
    } catch (error) {
        console.log(error);
        
    }
})

export default router;