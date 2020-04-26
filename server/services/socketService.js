
const configs = require('../configurations/pass')
const SockerService = {}

var patientQueue = []

SockerService.Register = (http) =>{
    var io = require('socket.io')(http);
    
    io.on('connection', function(socket){
        console.log('A user connected :D');
        socket.emit("welcome",{msg:"welcome",queue:patientQueue.slice(0,5)})
        
        socket.on("queue_patient",(data) =>{
            if(data.token == configs.Socket.tokenPatient){
                let patPos = patientQueue.indexOf(data.id)
                if(patPos < 0){
                    patientQueue.push(data.id)
                    console.log("Patient joined to queue ->",patientQueue)
                    socket.emit("queue_patient_position",{id:data.id,position: patientQueue.length})
                    socket.broadcast.emit("queue_patients_status",{queue:patientQueue,current:"None",timestamp:(new Date()).getTime()})
                }else{
                    console.log("Patient reconnected on queue -> ", data.id)
                    socket.emit("queue_patient_position",{id:data.id,position: patPos+1})
                }
            }else
                socket.disconnect()
        })

        socket.on("get_queue_position",(data) =>{
            let pos = patientQueue.indexOf(data.id)
            socket.emit("queue_position",{pos})
        })

        socket.on("pop_queue_patient",(data) =>{
            if(data.token == configs.Socket.tokenDoctor){
                let patient = patientQueue.shift()
                socket.emit("queued_patient",{patient})
                socket.broadcast.emit("queue_patients_status",{queue:patientQueue,current:patient,timestamp:(new Date()).getTime()})
                console.log("Patient poped Queue",patient,patientQueue)
            }else
                socket.disconnect();
        })

        socket.on("flush_queue",()=>{
            if(data.token == configs.Socket.tokenAdmin){
                print("Flushing QUEUE")
                patientQueue = []
                socket.broadcast.emit("queue_patients_status",{queue:patientQueue,current:patient,timestamp:(new Date()).getTime()})
            }else
                socket.disconnect();
        })

        socket.on("send_message", (data) => {
            socket.broadcast.emit("receive_message", data)
        })
        
        socket.on('chat message', function(msg){
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });
    
        socket.on('disconnect', function(){
          console.log('user disconnected :(');
        });
    });
}

module.exports = SockerService
