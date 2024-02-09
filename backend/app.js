// Import Express Modul
const express = require("express");
// Import bodyparser module
const bodyParser = require("body-parser");
// Import bcrypt module
const bcrypt = require("bcrypt");
// Import multer module
const multer = require("multer");
// Import path module
const path = require("path");
//Import ObjectId
const { ObjectId } = require("mongodb");

// Import mongoose module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/brightonDB');

// Import jsonwebtoken module
const jwt = require('jsonwebtoken');
// Import express-session module
const session = require('express-session');

// Create Express Application
const app = express();


// Models Importation
const User = require("./models/user");
const Course = require("./models/course");
const CourseEnrollment = require("./models/courseEnrollment");
const NoteEvaluation = require("./models/noteEvaluation");


// Application Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Security Config 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

// Session Configuration
const secretKey = 'croco23';
app.use(
    session({
        secret: secretKey,
    })
);

// ShortCut 
app.use("/myFiles", express.static(path.join("backend/images")));
// Media Types
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf'
}

//  Multer config
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    // filename
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    },
});


//   BL: SignUp For Teacher
app.post("/api/users/signupTeacher", multer({ storage: storageConfig }).fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), (req, res) => {
    console.log("Here into signup", req.body);
    console.log("Here Files", req.files);
    console.log("Here Image", req.files['img'][0]);
    console.log("Here CV", req.files['cv'][0]);

    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
        console.log("Here crypted Pwd", cryptedPwd);
        req.body.password = cryptedPwd;
        req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.files['img'][0].filename}`;
        req.body.cvPdf = `${req.protocol}://${req.get("host")}/myFiles/${req.files['cv'][0].filename}`;
        let user = new User(req.body);
        user.save((err, doc) => {
            console.log("Here error", err);
            console.log("successs", doc);
            if (err) {
                if (err.errors.email && err.errors.tel) {
                    res.json({ msg: 0 });
                } else if (err.errors.email) {
                    res.json({ msg: 1 });
                } else {
                    res.json({ msg: 2 });
                }
            } else {
                res.json({ msg: 3 });
            }
        });
    });
});

//   BL: SignUp For Student
app.post("/api/users/signupStudent", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log("Here into signup", req.body);
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
        console.log("Here crypted Pwd", cryptedPwd);
        req.body.password = cryptedPwd;
        req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
        let user = new User(req.body);
        user.save((err, doc) => {
            console.log("Here error", err);
            console.log("successs", doc);
            if (err) {
                if (err.errors.email && err.errors.tel) {
                    res.json({ msg: 0 });
                } else if (err.errors.email) {
                    res.json({ msg: 1 });
                } else {
                    res.json({ msg: 2 });
                }
            } else {
                res.json({ msg: 3 });
            }
        });
    });
});

//   BL: SignUp For Parent
app.post("/api/users/signupParent", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log("Here into signup", req.body);
    User.findOne({ tel: req.body.childTel, role: "student" }).then((doc) => {
        console.log("Here Student", doc);
        if (!doc) {
            // Student not found
            res.json({ msg: "0" })
        } else {
            bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
                console.log("Here crypted Pwd", cryptedPwd);
                req.body.password = cryptedPwd;
                req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
                let user = new User(req.body);
                user.save((err, doc) => {
                    console.log("Here error", err);
                    console.log("successs", doc);
                    if (err) {
                        if (err.errors.email && err.errors.tel) {
                            res.json({ msg: 1 });
                        } else if (err.errors.email) {
                            res.json({ msg: 2 });
                        } else {
                            res.json({ msg: 3 });
                        }
                    } else {
                        res.json({ msg: 4 });
                    }
                });
            });
        }
    });
});

//   BL: SignUp For Admin
app.post("/api/users/signupAdmin", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log("Here into signup", req.body);
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
        console.log("Here crypted Pwd", cryptedPwd);
        req.body.password = cryptedPwd;
        req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
        let user = new User(req.body);
        user.save((err, doc) => {
            console.log("Here error", err);
            console.log("successs", doc);
            if (err) {
                if (err.errors.email && err.errors.tel) {
                    res.json({ msg: "0" });
                } else if (err.errors.email) {
                    res.json({ msg: "1" });
                } else {
                    res.json({ msg: "2" });
                }
            } else {
                res.json({ msg: "3" });
            }
        });
    });
});

//   BL: Login 
app.post("/api/users/login", (req, res) => {
    console.log("Here User", req.body);
    let user;
    User.findOne({ tel: req.body.tel })
        .then((doc) => {
            console.log("Here doc", doc);
            user = doc;
            if (!doc) {
                // Send Tel Error Msg
                res.json({ msg: 0 });
            } else {
                // Check PWD
                return bcrypt.compare(req.body.password, doc.password);
            }
        }).then((isEqual) => {
            console.log("Here is equal", isEqual);
            if (!isEqual) {
                // Send Pwd Error msg
                res.json({ msg: 1 })
            } else {
                if (user.role == "teacher") {
                    if (user.status == "confirmed") {
                        let userToSend = {
                            userId: user._id,
                            fName: user.firstName,
                            lName: user.lastName,
                            email: user.email,
                            tel: user.tel,
                            role: user.role,
                            childTel: user.childTel
                        };
                        const token = jwt.sign(userToSend, secretKey, { expiresIn: '20h' });
                        res.json({ user: token, msg: 2 });
                    } else {
                        res.json({ msg: 3 });
                    }
                } else {
                    let userToSend = {
                        userId: user._id,
                        fName: user.firstName,
                        lName: user.lastName,
                        email: user.email,
                        tel: user.tel,
                        role: user.role,
                        childTel: user.childTel
                    };
                    const token = jwt.sign(userToSend, secretKey, { expiresIn: '20h' });
                    res.json({ user: token, msg: 2 });
                }
            }
        });
});

// BL: Update Teacher Status
app.put("/api/users/updateTeacherStatus", (req, res) => {
    console.log("id of teacher", req.body.idTeacher);
    User.updateOne({ _id: req.body.idTeacher }, { $set: { status: "confirmed" } }).then(
        (response) => {
            if (response.nModified == 1) {
                res.json({ msg: 1 });
            } else {
                res.json({ msg: 0 });
            }
        })
});

// _________________________________________________________________________________________________________
// BL: Add Course
app.post("/api/courses", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log("Here into BE Add course", req.body);
    req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
    let course = new Course({
        courseName: req.body.courseName,
        duration: req.body.duration,
        price: req.body.price,
        description: req.body.description,
        avatar: req.body.avatar,
        teacherId: mongoose.Types.ObjectId(req.body.teacherId)
    });
    course.save((err, doc) => {
        if (err) {
            res.json({ msg: 0 })
        } else {
            res.json({ msg: 1 });
        }
    });
});

// BL Get All Courses
app.get("/api/courses", (req, res) => {
    Course.find().then(
        (docs) => {
            console.log("Here Docs", docs);
            res.status(200).json({ courses: docs });
        });
});
// BL Get All Courses with Teacher
app.get("/api/courses/andTeachers", (req,res)=>{
    Course.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "teacherId",
                foreignField: "_id",
                as: "teacher"
            }
        }
    ], (error, docs)=>{
        console.log("Here Courses from BE", docs);
        if (!docs) {
            res.status(200).json({msg: 0});
        } else {
            res.status(200).json({msg: 1, courses: docs});
        }
    })
});

// BL: Get Course By Id
app.get("/api/courses/:id", (req, res) => {
    console.log("Here request from BE", req.params.id);
    Course.findOne({ _id: req.params.id }).then(
        (doc) => {
            console.log("Here doc", doc);
            res.status(200).json({ course: doc });
        });
});

// BL: Get Course By Id For Edit
app.get("/api/courses/editCourse/:id", (req, res) => {
    console.log("Here request from BE", req.params.id);
    Course.findOne({ _id: req.params.id }).then(
        (doc) => {
            console.log("Here doc", doc);
            let course = {
                courseName: doc.courseName,
                duration: doc.duration,
                price: doc.price,
                description: doc.description
            };
            res.status(200).json({ courseEdit: course });
        });
});

// BL: Get All Courses By Id Teacher
app.get("/api/courses/teacher/:id", (req, res) => {
    console.log("Here into BE", req.params.id);
    Course.find({ teacherId: req.params.id }).then(
        (docs) => {
            res.status(200).json({ courses: docs });
        });
});

// BL: Delete Course By Id
app.delete("/api/courses/:id", (req, res) => {
    console.log("Here from BE", req.params.id);
    Course.deleteOne({ _id: req.params.id }).then(
        (result) => {
            console.log("Here response after delete", result);
            result.deletedCount == 1
                ? res.json({ isDeleted: true })
                : res.json({ isDeleted: false });
        });
});

// BL: Edit Course
app.put("/api/courses", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log("Here from BE", req.body);
    console.log("Here File", req.file);

    if (req.file) {
        req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
        console.log("Here avatar", req.body.avatar);
    }
    Course.updateOne({ _id: req.body._id }, req.body).then(
        (response) => {
            if (response.nModified == 1) {
                res.json({ msg: 1 });
            } else {
                res.json({ msg: 0 });
            }
        });
});

// BL : Assign Course To Student
app.post("/api/courses/courseEnrollment", (req, res) => {
    console.log("Here obj from BE", req.body);
    CourseEnrollment.findOne({ $and: [{ studentId: req.body.studentId }, { courseId: req.body.courseId }] }).then(
        (doc) => {
            console.log("Here doc from BE", doc);
            if (doc) {
                res.json({ msg: 0 });
            } else {
                let courseEnrollment = new CourseEnrollment({
                    studentId: ObjectId(req.body.studentId),
                    courseId: ObjectId(req.body.courseId)
                });
                courseEnrollment.save(
                    (err, doc) => {
                        console.log("Here response", doc);
                        if (err) {
                            res.json({ msg: 1 })
                        } else {
                            res.json({ msg: 2 });
                        }
                    });
            }
        });
});

//BL : Get all Courses Enrollment By Id Student
app.post("/api/courses/coursesEnrollmentByIdStudent", (req, res) => {
    let studentId = ObjectId(req.body.studentId);
    let role = req.body.role;

    if (role === "admin") {
      return  CourseEnrollment.aggregate([
            {
                $match: { studentId: studentId }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "courseId",
                    foreignField: "_id",
                    as: "course"
                }
            },
            {
                $limit: 4
            }
        ],
            (error, docs) => {
                console.log("Here Courses Enrollment", docs);
                if (error) {
                    res.status(500).json({ msg: 0 });
                } else {
                    res.status(200).json({ coursesEnrollment: docs });
                }
            }
        );
    } else{
      return CourseEnrollment.aggregate([
        {
            $match: { studentId: studentId }
        },
        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "course"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "course.teacherId",
                foreignField: "_id",
                as: "teacher"
            }
        }
    ],
        (error, docs) => {
            console.log("Here Courses Enrollment", docs);
            if (error) {
                res.status(500).json({ msg: 0 });
            } else {
                res.status(200).json({ coursesEnrollment: docs });
            }
        }
    );
    } 
});

//BL : Get all Courses Enrollment By Child's Phone Number For Parent
app.get("/api/courses/coursesEnrollmentByChildTel/:childTel", (req, res) => {
    console.log("Here Child's Phone Number", req.params.childTel);
    User.findOne({ tel: req.params.childTel }).then(
        (findedStudent) => {
            console.log("Here Student", findedStudent);
            if (!findedStudent) {
                res.json({ msg: 0 })
            } else {
                console.log("Here Id Student", findedStudent._id);
                let studentId = ObjectId(findedStudent._id);
                console.log("Here id Student", studentId);
                CourseEnrollment.aggregate([
                    {
                        $match: { studentId: studentId }
                    },
                    {
                        $lookup: {
                            from: "courses",
                            localField: "courseId",
                            foreignField: "_id",
                            as: "course"
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "course.teacherId",
                            foreignField: "_id",
                            as: "teacher"
                        }
                    }
                ],
                    (error, docs) => {
                        console.log("Here Courses Enrollment", docs);
                        if (error) {
                            res.status(500).json({ msg: 1 });
                        } else {
                            res.status(200).json({ coursesEnrollment: docs, msg: 2 });
                        }
                    });
            }
        });
});

//BL: Append Note and Evaluation to Student
app.post("/api/notesEvaluations/appendNoteEvaluation", (req, res) => {
    console.log("Here obj from BE", req.body);
    NoteEvaluation.findOne({ $and: [{ idStudent: req.body.idStudent }, { idCourse: req.body.idCourse }] }).then(
        (doc) => {
            console.log("Here doc from BE", doc);
            if (doc) {
                res.json({ msg: 0 });
            } else {
                let noteEvaluation = new NoteEvaluation({
                    idStudent: ObjectId(req.body.idStudent),
                    idCourse: ObjectId(req.body.idCourse),
                    note: req.body.note,
                    evaluation: req.body.evaluation
                });
                noteEvaluation.save(
                    (err, doc) => {
                        console.log("Here response", doc);
                        if (err) {
                            res.json({ msg: 1 })
                        } else {
                            res.json({ msg: 2 });
                        }
                    });
            }
        })
});
// _________________________________________________________________________________
// BL: Get Note And Evaluation for a (student and parent)
app.post("/api/notesEvaluations", (req, res) =>{
    console.log("Here obj from BE", req.body);

    const role= req.body.role;
    const userId= req.body.idUser;
    const idCourse= req.body.idCourse;
    const childTel= req.body.childTel;

    if (role === "student") {
        NoteEvaluation.findOne({ $and: [{ idStudent: userId }, { idCourse: idCourse }] }).then(
                    (doc) => {
                        console.log("Here doc from BE", doc);
                        (doc)
                            ? res.json({ doc: doc, msg: 1 })
                            : res.json({ msg: 0 });
                    });
    }
    if (role === "parent") {
        User.findOne({tel: childTel}).then(
            (findedStudent)=>{
                if (findedStudent) {
                    return NoteEvaluation.findOne({ $and: [{ idStudent: findedStudent._id }, { idCourse: idCourse }] });
                }   
            }).then(
                (doc)=>{
                    console.log("Here doc from BE", doc);
                        (doc)
                            ? res.json({ doc: doc, msg: 3 })
                            : res.json({ msg: 2 });
                }
            )
    }
});

// _______________________________________________________________________________
// BL : Get User By Id
app.get("/api/users/:id", (req, res) => {
    User.findOne({ _id: req.params.id }).then(
        (doc) => {
            res.status(200).json({ user: doc });
        });
});
// BL : Get Parent By Id
app.get("/api/users/getParentById/:id", (req, res) => {
    let parent;
    User.findOne({ _id: req.params.id }).then(
        (docParent) => {
            parent= docParent;
            User.findOne({tel: docParent.childTel}).then(
            (docChild)=>{
            console.log('Here child From BE', docChild);
            if (parent) {
                res.json({parent: parent, child: docChild});
            }
            });
        });
});

// BL: Get All Users By Role (teachers or students or parents)
app.get("/api/users/getUsersByRole/:role", (req, res) => {
    let role= req.params.role;
    if(role == "student"){
        User.find({ role: "student" }).then(
            (docs) => {
                console.log("Here students from BE", docs);
                res.status(200).json({ users: docs });
            });
    }else if(role == "teacher"){
        User.find({ role: "teacher" }).then(
            (docs) => {
                console.log("Here teachers from BE", docs);
                res.status(200).json({ users: docs });
            });
    }else if(role == "parent"){
        User.find({ role: "parent" }).then(
            (docs) => {
                console.log("Here parents from BE", docs);
                res.status(200).json({ users: docs });
            });
    }
});
// BL: Get All Teachers Confirmed
app.get("/api/users/teachers/confirmed", (req, res) => {
    User.find({role: "teacher" , status: "confirmed"}).then(
        (docs) => {
            console.log("Here into teachers confirmed", docs);
            res.status(200).json({ teachers: docs });
        });
});


// BL: Get Teachers By Speciality
app.get("/api/users/searchTeachers/:specialityTeacher", (req,res)=>{
    let speciality= req.params.specialityTeacher;
    User.find({speciality: speciality, status: "confirmed"}).then(
        (docs)=>{
            console.log("Here teachers", docs);
            (docs)
            res.json({teachers: docs});
        });
});

// BL: get Students By Id Course
app.get("/api/users/getStudentsByIdCourse/:id", (req, res) => {
    let idCourse = ObjectId(req.params.id);
    console.log("Here ID course", idCourse);
    CourseEnrollment.aggregate([
        {
            $match: { courseId: idCourse }
        },
        {
            $lookup: {
                from: "users",
                localField: "studentId",
                foreignField: "_id",
                as: "enrolledStudents"
            },
        },
    ],
        (error, docs) => {
            console.log("Here Students Enrollment", docs);
            if (error) {
                res.status(500).json({ msg: 0 });
            } else {
                res.status(200).json({ enrolledStudents: docs });
            }
        }
    );
});
// BL: Delete User By Id
app.delete("/api/users/:id", (req, res) => {
    console.log("Here id", req.params.id);
    User.deleteOne({ _id: req.params.id }).then(
        (result) => {
            result.deletedCount == 1
                ? res.status(200).json({ isDeleted: true })
                : res.status(200).json({ isDeleted: false });
        });
});
// BL: Update Profile (Student or Parent)
app.put("/api/users/editProfile", (req,res)=>{
    console.log("Here new User From BE", req.body);
    console.log("Here Id user from BE", req.body._id);
    User.updateOne({_id: req.body._id}, req.body).then(
        (result)=>{
            console.log("Here Inti nModified", result.nModified);
            if (result.nModified == 1) {
                res.json({msg: 1});
            }else{
                res.json({msg: 0});
            }
        });
});

// BL: Update Profile Teacher
app.put("/api/users/editProfileTeacher", multer({ storage: storageConfig }).single('cv'), (req,res)=>{
    console.log("Here from BE", req.body);
    console.log("Here File", req.file);
    if (req.file) {
        req.body.cvPdf = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
        console.log("Here Cv", req.body.cvPdf);
    }
    User.updateOne({ _id: req.body._id }, req.body).then(
        (result)=>{
            console.log("Here result", result.nModified);
            if (result.nModified == 1) {
                res.json({ msg: "1" });
            } else {
                res.json({ msg: "0" });
            }
        }
    );
});

// BL: Update Profile Picture
app.put("/api/users/editProfilePicture",multer({storage: storageConfig}).single('img'),(req,res)=>{
console.log("Here Id User From BE", req.body._id);
console.log("Here File", req.file);

req.body.avatar= `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
console.log("Here Image", req.body.avatar);

User.updateOne({_id: req.body._id}, req.body).then(
    (result)=>{
        console.log("Here Into nModified", result.nModified);
        if (result.nModified == 1) {
            res.json({msg: 1});
        }else{
            res.json({msg: 0});
        }
    }
);


});




// Make Application Exportable
module.exports = app;

