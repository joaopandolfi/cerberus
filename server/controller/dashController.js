const PermissionLevelController = require('./permissionLevelController')
const constants = require('../configurations/constants')
const pass = require('../configurations/pass')

const DashController = {}

var GenerateMetadata = (title) =>{
	return {
		site:{titulo:['Telecovid'],descricao:['Telecovid a vídeo conferência da W3Care'],keywords:['CORONA, COVID, w3care, telecovid'],charset:['ISO-8859-1']},
		empresa:{name:['W3.Care'],endereco:['São Paulo - SP']},
		layout:{icon:['/public/icon.png'],logo:['/public/logo_telecovid.png']},
		user:{name:['Admin'],empresa:['W3.Care'],cargo:['Médico'],avatar:['/public/medico_heroi.png']},
		dados:{page:[title]},
	}
}

DashController.Login = (req,res) =>{
    res.render('dash-login.hbs',{
		metadata: GenerateMetadata("Administração"),
	})
}

DashController.Home = (req,res) =>{
    res.render('dash-home.hbs',{
		metadata: GenerateMetadata("Dash Geral"),
		balanco:{tipo:['Alto Risco|Baixo Risco'],valores:['56|14']},
		faixaetaria:{tipo:['0-09|10-19|20-29|30-39|40-49|50-59|60-69|70+'],valores:['2|5|900|70|30|50|75|150']},
		atendimentos:['981'],
		pacientes:['1010'],
		telemedicina:['50'],
		profissionais:['10'],

	})
}

DashController.Users = (req,res) =>{
    res.render('dash-new-user.hbs',{
		metadata: GenerateMetadata("Novo Usuário")

	})
}


DashController.Location = (req,res) =>{
    res.render('dash-location.hbs',{
		metadata: GenerateMetadata("Geolocalização")

	})
}

DashController.Patient = (req,res) =>{
    res.render('dash-patients.hbs',{
		metadata: GenerateMetadata("Pacientes"),

	})
}

DashController.Clinical = (req,res) =>{
    res.render('dash-clinical-condition.hbs',{
		metadata: GenerateMetadata("Quadro Clínico"),
		risk:{high:['56'],low:['14'],total:['70']},

	})
}

DashController.AgeRange = (req,res) =>{
    res.render('dash-age-range.hbs',{
		metadata: GenerateMetadata("Faixa Etária"),
		age:{masc:['56'],fem:['14'],total:['70']},

	})
}

DashController.Attendances = (req,res) =>{
    res.render('dash-attendances.hbs',{
		metadata: GenerateMetadata("Total de Atendimentos"),

	})
}

DashController.Doctors = (req,res) =>{
    res.render('dash-doctors.hbs',{
		metadata: GenerateMetadata("Total de Médicos"),

	})
}

DashController.Users = (req,res) =>{
    res.render('dash-users.hbs',{
		metadata: GenerateMetadata("Usuários"),
		users:[
		//'{"",""}'
		],

	})
}


module.exports = DashController