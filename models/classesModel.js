const nedb = require('gray-nedb');
//class model - database for dance classes, stores information like class name, start data, duration location etc...
class ClassesDAO{
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
            console.log('classes database created');
        }
    }
    //populate the database with classes
    init(){
        console.log('populating courses...');
        try{
            let classTitle1 = 'Beginner Waltz Class';
            let classTitle2 = 'Salsa for Beginners';
            let classTitle3 = 'Highland Dance Workshop'
            let classTitle4 = 'Street Dance intermediate';
            let classTitle5 = 'Ballroom and Latin Expert class'

            let startDate1 = '2025-07-15';
            let startDate2 = '2025-05-16';
            let startDate3 = '2025-04-29';
            let startDate4 = '2025-05-28';
            let startDate5 = '2025-07-05';

            let startTime1 = '18:00';
            let startTime2 = '12:00';
            let startTime3 = '15:00';
            let startTime4 = '16:00';
            let startTime5 = '13:00';

            let duration1 = 3;
            let duration2 = 2;
            let duration3 = 7;
            let duration4 = 5;
            let duration5 = 8;

            let location1 = 'Hamilton Dance Studio';
            let location2 = 'coatbridge community hall';
            let location3 = 'airdrie arts center'
            let location4 = 'Motherwell center lanarkshire';
            let location5 = 'East Kilbride Dance Academy';

            let description1 = 'Learn the elegant basics of the waltz in a relaxed, friendly setting. Perfect for first-time dancers';
            let description2 = 'Spicy, fun, and energetic—discover the joy of salsa with our expert instructors';
            let description3 = 'Traditional Scottish highland dance techniques for all skill levels. Tartan optional';
            let description4 = 'Get moving with urban dance styles—great for fitness and fun';
            let description5 = 'Polish off techniques for ballroom and Latin dances in this lively introductory session';

            let cost1 = 11.11;
            let cost2 = 15.66;
            let cost3 = 7;
            let cost4 = 16.20;
            let cost5 = 56;

            this.create(classTitle1, startDate1, startTime1, duration1, location1, description1, cost1);
            this.create(classTitle2, startDate2, startTime2, duration2, location2, description2, cost2);
            this.create(classTitle3, startDate3, startTime3, duration3, location3, description3, cost3);
            this.create(classTitle4, startDate4, startTime4, duration4, location4, description4, cost4);
            this.create(classTitle5, startDate5, startTime5, duration5, location5, description5, cost5);

            console.log(`class1 inserted: ${classTitle1}`);
            console.log(`class2 inserted: ${classTitle2}`);
            console.log(`class3 inserted: ${classTitle3}`);
            console.log(`class4 inserted: ${classTitle4}`);
            console.log(`class5 inserted: ${classTitle5}`);

            console.log('poplating classes complete.\n');
        }catch(err){
            console.log(`Error: ${err.message}`);
        }

    }
    //create a class and insert into db
    create(class_title, start_date, start_time, duration, location, description, cost, cb){
        console.log(`creating new class: ${class_title}\nPlease wait...`);
        return new Promise((resolve, reject)=>{
            var entry = {
                class_title : class_title,
                start_date : start_date,
                start_time : start_time,
                duration : duration,
                location : location,
                description : description,
                cost : cost
            }
            this.db.insert(entry, (err)=>{
                if(err){
                    //error inserting class
                    console.log(`cant insert class: ${class_title}`);
                    reject(err);
                }else{
                    //insert successful
                    console.log(`class inserted: ${class_title}`);
                    resolve();
                }
            });
        });
        
    }
    //return a list of all the classes
    getAllClasses(){
        return new Promise((resolve, reject)=>{
            this.db.find({},(err, classes)=>{
                if(err){
                    //error getting classes
                    console.log(`Error getting all classes ${err.message}`);
                    reject(err);
                }else{
                    //resolve with the list of all classes
                    resolve(classes);
                }
            });
        });
    }
    //gets a specific class by the class id
    getClassById(class_id){
        return new Promise((resolve, reject)=>{
            this.db.find({'_id': class_id},(err, cls)=>{
                if(err){
                    //error getting a class
                    reject(err);
                }else{
                    //resolves with class
                    resolve(cls);
                }
            });
        });
    }
    //looks up a dance class with call back method
    lookup(danceClass, cb){
        console.log(`looking up dance class: ${danceClass}\nPlease wait...`);
        this.db.find({'class_title': danceClass}, (err, classes)=>{
            if(err){
                //error during lookup
                console.log(`error during class lookup: ${err.message}`);
                return cb(null, null);
            }
            //class not found
            if(classes.length == 0){
                console.log(`class: ${danceClass} not found.`);
                return cb(null, null);
            }else{
                //class found
                console.log(`class ${danceClass} found.`);
                return cb(null, classes[0]);
            }
        });
    }
    //updates an existing class 
    updateClass(classId, class_title, start_date, start_time, duration, location, description, cost){
        return new Promise((resolve, reject)=>{
            this.db.update({_id: `${classId}`,},
                {$set:{'class_title': `${class_title}`,
                'start_date': `${start_date}`,
                'start_time': `${start_time}`,
                'duration': `${duration}`,
                'location': `${location}`,
                'description': `${description}`,
                'cost': `${cost}`        
            }},{}, (err, doc)=>{
                if(err){
                    //error updating class
                    console.log('Error updating class', err);
                    reject(err);
                }else{
                    //update success
                    console.log('document updated', doc);
                    resolve(doc);
                }
            });
        });
    }
    //removes a class from the database using the class id
    remove(classId){
        return new Promise((resolve, reject)=>{
            this.db.remove({_id: classId}, {}, (err, docRemoved)=>{
                if(err){
                    //error removing class
                    console.log('error deleting class');
                    reject(err);
                }else{
                    //remove class success
                    console.log('class removed: ', docRemoved);
                    resolve(docRemoved);
                }
            });
        });
    }
}
const dao = new ClassesDAO({filename: './data_store/danceClass.db'});
// dao.init(); //populate classes

module.exports = dao;