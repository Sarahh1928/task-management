const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const axios = require('axios');
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,            
}));
app.use(express.json());
require('./config/connection'); 
const User = require('./models/User');
const Tasks = require('./models/Tasks');
axios.defaults.withCredentials = true;

app.use(session({
    secret: 'random', 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/todolist',
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60*60*24, 
    }
}));

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, email, password });
        await user.save();  
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        res.status(500).send('Server error');
    }
});
app.get('/check-session', (req, res) => {
    if (req.session.userId) {
        res.send('Session is active');
    } else {
        res.status(401).send('Session has expired');
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        let user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        req.session.userId = user._id;  
        let userTasks = await Tasks.findOne({ userId: user._id });
        console.log(userTasks);
        if (!userTasks) {
            userTasks = new Tasks({
                userId: user._id,
                tasks: []  
            });
            userTasks.save();
        }
        console.log('Session after login:', req.session);
        res.json({ msg: 'User logged in successfully' });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

const requireLogin = (req, res, next) => {
    console.log(req.session, req.session.userId);
    if (!req.session.userId) {
        return res.status(401).json({ msg: 'Please log in to access this resource' });
    }
    console.log("hiii2")
    next();
};

app.get('/tasks', requireLogin, async (req, res) => {
    const userId = req.session.userId; 
    
    try {
        const userTasks = await Tasks.findOne({ userId });

        if (!userTasks || userTasks.tasks.length === 0) {
            return res.status(404).json({ msg: 'No tasks found for this user' });
        }

        res.status(200).json(userTasks.tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.post('/addtask', requireLogin, async (req, res) => {
    const { description, Deadline, category } = req.body;
    const userId = req.session.userId;

    try {
        
        let userTasks = await Tasks.findOne({ userId });

        if (!userTasks) {
            
            userTasks = new Tasks({
                userId,
                tasks: [],
            });
        }

        const newTask = {
            description,
            Deadline,
            category,
        };

        userTasks.tasks.push(newTask);

        await userTasks.save();

        res.status(201).json({ msg: 'Task added successfully', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});
app.post('/changepassword', requireLogin, async (req, res) => {
    const { email, currentpassword, newpassword } = req.body;
    console.log(currentpassword, email, newpassword);

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Please enter your email' });
        }

        if (user.password !== currentpassword) {
            return res.status(400).json({ msg: 'Current password is not correct' });
        }
        if (user.password === newpassword) {
            return res.status(400).json({ msg: 'New password should not be same as old password' });
        }

        user.password = newpassword;
        await user.save();

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.delete('/deletetask/:taskId', requireLogin, async (req, res) => {
    const userId = req.session.userId;
    const { taskId } = req.params;
    console.log("idkkk am i here?", taskId, userId);
    try {
        
        let userTasks = await Tasks.findOne({ userId });

        if (!userTasks) {
            return res.status(404).json({ msg: 'Task list not found' });
        }

        userTasks.tasks = userTasks.tasks.filter((task, index) => index !== parseInt(taskId));

        await userTasks.save();

        res.status(200).json({ msg: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.put('/updatetask/:taskId', requireLogin, async (req, res) => {
    const { taskId } = req.params;
    const { completed } = req.body;
    const userId = req.session.userId; 
    
    try {
      let userTasks = await Tasks.findOne({ userId });
  
      if (!userTasks) {
        return res.status(404).json({ msg: 'Task list not found' });
      }
  
      const task = userTasks.tasks.id(taskId);
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
  
      task.completed = completed;
  
      await userTasks.save();
  
      res.status(200).json({ msg: 'Task updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  

app.listen(4000, () => {
    console.log('done');
})