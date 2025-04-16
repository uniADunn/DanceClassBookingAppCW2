const nedb = require('gray-nedb');
//course model database - stores information relating to a course such as name, start date, duration of course, start time of courses, location etc...
class CoursesDAO{
    //constructor
    constructor(dbFilePath){
        if(dbFilePath){
            //embedded db
            this.db = new nedb({
                filename: dbFilePath.filename,
                autoload: true
            });
            console.log(`database connected to: ${dbFilePath.filename}.`);
        }else{
            //in memory db
            this.db = new nedb();
            console.log('Courses database created');
        }
    }
    //populate the database with courses - used for testing(dummy data)
    init(){
        console.log('populating courses...');
        try{
            //set data
            let courseTitle1 = 'Ballet Fundamentals';
            let courseTitle2 = 'breakdance beginner to expert';
            let courseTitle3 = 'Kids Creative Dance';
            let courseTitle4 = 'Family Line Dancing';
            let courseTitle5 = 'Wedding Day Dance';
            
            let startDate1 = '2025-07-15';
            let startDate2 = '2025-05-16';
            let startDate3 = '2025-04-29';
            let startDate4 = '2025-05-28';
            let startDate5 = '2025-07-05';
            
            let courseDuration1 =  12;
            let courseDuration2 =  26;
            let courseDuration3 =  7;
            let courseDuration4 =  6;
            let courseDuration5 =  6;

            let classStartTime1 = '15:00';
            let classStartTime2 = '17:00';
            let classStartTime3 = '14:00';
            let classStartTime4 = '20:00';
            let classStartTime5 = '16:00';

            let classDuration1 = 2;
            let classDuration2 = 4;
            let classDuration3 = 3;
            let classDuration4 = 2;
            let classDuration5 = 5;

            let location1 = 'Lanarkshire Dance Academy';
            let location2 = 'Bellshill Dance Studio';
            let location3 = 'Coatbridge Community Center';
            let location4 = 'east kilbride arts center';
            let location5 = 'Uddingston Dance Hall';

            let description1 = 'Build a strong foundation in classical ballet with expert guidance Perfect for beginners this course focuses on posture technique and grace in a supportive environment';
            let description2 = 'From floor spins to power moves learn breaking step by step in this high-energy course No experience needed just enthusiasm';
            let description3 = 'A playful introduction to movement for little ones Through games and music children explore rhythm coordination and self expression';
            let description4 = 'Boot scootin fun for all ages Learn classic line dances together in a lively inclusive atmosphere No partners required';
            let description5 = 'Nail your first dance with confidence Tailored for couples this class covers choreography basics to shine on your big day';

            let cost1 = 123;
            let cost2 = 222.22;
            let cost3 = 120;
            let cost4 = 50;
            let cost5 = 399.99;

            
            this.create(courseTitle1, startDate1, courseDuration1, classStartTime1, classDuration1, location1, description1, cost1);
            this.create(courseTitle2, startDate2, courseDuration2, classStartTime2, classDuration2, location2, description2, cost2);
            this.create(courseTitle3, startDate3, courseDuration3, classStartTime3, classDuration3, location3, description3, cost3);
            this.create(courseTitle4, startDate4, courseDuration4, classStartTime4, classDuration4, location4, description4, cost4);
            this.create(courseTitle5, startDate5, courseDuration5, classStartTime5, classDuration5, location5, description5, cost5);


            console.log(`course inserted: ${courseTitle1}`);
            console.log(`course inserted: ${courseTitle2}`);
            console.log(`course inserted: ${courseTitle3}`);
            console.log(`course inserted: ${courseTitle4}`);
            console.log(`course inserted: ${courseTitle5}`);
            console.log('poplating course complete.\n');
        }catch(err){
            console.log(`Error: ${err.message}`);
        }

    }
    //create new course entries into db
    create(course_title, start_date, course_duration, class_start_time, class_duration, location, description, cost){
        console.log(`creating new course: ${course_title}\nPlease wait...`);
        return new Promise((resolve, reject)=>{
            //the course data entries
            var entry = {
                course_title: course_title,
                start_date: start_date,
                course_duration: course_duration,
                class_start_time: class_start_time,
                class_duration: class_duration,
                location: location,
                description: description,
                cost: cost
            }
            //insert into db
            this.db.insert(entry, (err)=>{
                if(err){
                    //error inserting into database
                    console.log(`cant insert course: ${course_title}`);
                    reject(err);
                }else{
                    //insert success
                    console.log(`class inserted: ${course_title}`);
                    resolve();
                }
            });
        });
        
    }
    //gets all the courses
    getAllCourses(){
        return new Promise((resolve, reject)=>{
            this.db.find({},(err, courses)=>{
                if(err){
                    //error getting courses
                    console.log(`Error getting all coarses ${err.message}`);
                    reject(err);
                }else{
                    //retrieved all courses
                    console.log('list of courses: ', courses);
                    resolve(courses);
                }
            });
        });
    }
    //gets a course by the course id
    getCourseById(course_id){
        return new Promise((resolve, reject)=>{
            this.db.find({'_id': course_id},(err, crs)=>{
                if(err){
                    //error getting course by id
                    reject(err);
                }else{
                    //course found
                    resolve(crs);
                }
            });
        });
    }
    //course look up by course title
    lookup(courseTitle, cb){
        console.log(`looking up dance course: ${courseTitle}\nPlease wait...`);
        this.db.find({'course_title': courseTitle}, (err, courses)=>{
            if(err){
                console.log(`error during course lookup: ${err.message}`);
                return cb(null, null);
            }
            if(courses.length == 0){
                console.log(`course: ${courseTitle} not found.`);
                return cb(null, null);
            }else{
                console.log(`course ${courseTitle} found.`);
                return cb(null, courses[0]);
            }
        });
    }
    //update course information
    updateCourse(courseId, course_title, start_date, course_duration, class_start_time, class_duration, location, description, cost){
        return new Promise((resolve, reject)=>{
            this.db.update({_id: `${courseId}`,},
                {$set:{'course_title': `${course_title}`,
                'start_date': `${start_date}`,
                'course_duration': `${course_duration}`,
                'class_start_time': `${class_start_time}`,
                'class_duration': `${class_duration}`,
                'location': `${location}`,
                'description': `${description}`,
                'cost': `${cost}`        
            }},{}, (err, doc)=>{
                if(err){
                    //error updating course
                    console.log('Error updating course', err);
                    reject(err);
                }else{
                    //update success
                    console.log('document updated', doc);
                    resolve(doc);
                }
            });
        });
    }
    //remove a course based on the course id
    remove(courseId){
        return new Promise((resolve, reject)=>{
            this.db.remove({_id: courseId}, {}, (err, docRemoved)=>{
                if(err){
                    //error deleting course
                    console.log('error deleting course');
                    reject(err);
                }else{
                    //course removed success
                    console.log('course removed: ', docRemoved);
                    resolve(docRemoved);
                }
            });
        });
    }
}
const dao = new CoursesDAO({filename: './data_store/danceCourses.db'});
dao.init(); //populate courses
module.exports = dao;