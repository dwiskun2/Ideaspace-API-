const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");
const bcrypt = require('bcrypt');
const fs = require('fs')
const _ = require('lodash');
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: process.env.DOMAIN});
const homeUrl = 'https://dummy-wadudu.herokuapp.com/';
const signinUrl = 'https://dummy-wadudu.herokuapp.com/signin.php';
const signupUrl = 'https://dummy-wadudu.herokuapp.com/signup.php'



module.exports = {

	daftar: (request, response) => {
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		response.write('daftar dahulu'); 
		response.end();
	},

	masuk: (request, response) => {
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		response.write('silakan login');
		response.end();
	},

	home: (request, response) => {
		response.writeHead(200, {
			'Content-Type': 'text/html'
		});
		response.write(`<h2>home</h2>`);
		response.end();
	},

	profil: async (req, res) => {
		// const sss= req.session.user
	
		if(!req.session.user){
			return res.status(401).send("belum login")
		}
		// console.log(sss)
		// console.log(sn)
	
		var data = {
			  sn: req.session.user.nama,
			  selamat: "selamat datang "
			};
	
		return res.status(200).send(data);
	
	},

	verifikasi: (request, response) => {
		response.writeHead(200, {
			'Content-Type': 'text/html'
		});
		response.write(`<h2>cek email kamu</h2>
	
	<button onclick="myFunction()">Click me</button>
	
	<button id="myButton" class="float-left submit-button" >kirim ulang</button>
	
	<p id="demo"></p>
	
	<script>
	console.log(window.location.pathname.substr(1));
	const token = window.location.pathname.substr(12)
	
	document.getElementById("myButton").onclick = function () {
		location.href = "http://localhost:8030/resend/"+token;    
		};
	
	function myFunction() {
	  document.getElementById("demo").innerHTML = token;
	}
	</script>`);
		response.end();
	},
	
	login: (request, response) => {
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		response.write('Silakan Login');
		response.end();
	},
	// proses signup atau registrasi
	signup: (req, res) => { 
		console.log(req.body);
		const {nama, email, password,biodata, isAdmin,secToken} = req.body;
		User.findOne({email}).exec((err, user) => { //proses mencari email di DB
			if(user){ //jika ketemu
	
				// return res.status(400).json({error: "Pengguna sudah ada, silakan login"});
				return res.redirect('http://localhost:8030/signin');
				res.end();
			}
	
			bcrypt.hash(password, 10, function(err, hash) {
				const password= hash 
	
			// proses pengiriman verifikasi email dan pembuatan token
			// link verifikasi akan expired dalam waktu 5menit
			const token = jwt.sign({nama, email,biodata, password, isAdmin}, process.env.JWT_ACC_ACTIVATE, {expiresIn:'90m'});
			// console.log(password)
			
			const data = {
				from: 'admin@wadudu.com',
				to: email,
				subject: 'Account Activation Link',
				html:`Selamat datang,
		  <br/>
		  Terimakasih sudah mendaftar
		  <br/><br/>
		  Aktifkan akunmu dengan klik tombol dibawah ini !!!
		  <br/>
		  <p>${token}</p>
		  <a href="http://localhost:8030/activateaccount/${token}" style="cursor: pointer;margin: 4px 2px;font-size: 20px;display: inline-block;text-decoration: none;text-align: center;padding: 18px 28px;border: none;background-color: #1c87c9;font-size: 20px;color:white;">Verify Here2</a>
		  <br/><br/>` 
			};
	
	
	
			// jika proses signup terpenuhi akan diproses pengiriman email
			mg.messages().send(data, function (error, body) {
				if(error){
					return res.json({message: 'Maaf terjadi kesalahan saat kirim email'})
				}
				console.log(token)
				// return res.json({message: 'Email sudah dikirim, silakan cek dan verifikasi akunmu !!'})
			});
	
				return res.redirect('http://localhost:8030/verifikasi/'+token);
				// return res.json({message: 'Email sudah dikirim, silakan cek dan verifikasi akunmu !!'})
			});
			return
	
		});
	},
	// resend
	resend: (req, res) => {
		// console.log(req.params)
		const token = req.params.token;
		// console.log(token)
	
		if(token){
			jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function(err, decodedToken){
				const {nama,email,biodata,password,isAdmin}=decodedToken;
				console.log(email)
	
				if(err){
					return res.status(400).json({error: 'Link salah atau kadaluarsa'})
				}
			// 	const {nama,email,biodata,password,isAdmin}=decodedToken;
	
				const data = {
				from: 'admin@wadudu.com',
				to: email,
				subject: 'Account Activation Link',
				html:`Selamat datang, resend
		  <br/>
		  Terimakasih sudah mendaftar
		  <br/><br/>
		  Aktifkan akunmu dengan klik tombol dibawah ini !!!
		  <br/>
		  <a href="http://localhost:8030/activateaccount/${token}" style="cursor: pointer;margin: 4px 2px;font-size: 20px;display: inline-block;text-decoration: none;text-align: center;padding: 18px 28px;border: none;background-color: #1c87c9;font-size: 20px;color:white;">Verify Here2</a>
		  <br/><br/>` 
			};
	
	
			mg.messages().send(data, function (error, body) {
				if(error){
					return res.json({message: 'Maaf terjadi kesalahan saat kirim email'})
				}
				// console.log(token)
				// return res.json({message: 'Email sudah dikirim, silakan cek dan verifikasi akunmu !!'})
	
			});
			res.redirect('http://localhost:8030/verifikasi/'+token);
	
			// res.end()
	
			})
		}else{
			return res.json({error: "Oppp !! Terjadi Kesalahan !!!"})
		}
		
	
		res.end();
	},
	// k
// untuk signin
	signin: async (req, res) => {
		const email = req.body.email;
		const password = req.body.password; 
		const user = await User.findOne({email});

		if(!user){
			// pilih nampilin error atau ke urlSignUP

			return res.status(400).json({
				error:"Pengguna tidak ada, silakan daftar dahulu"
			})

			// res.redirect('/api/daftar');
		}
		
		// proses cek kesamaan password inputan dengan DB
		const valid = await bcrypt.compare(password, user.password);

		// jika berbeda
		if (!valid) {
			return res.status(400).json({
				error:"password salah"
			})
		}

		req.session.user = user;

		// dalam sign ada JWT signin akan aktif selama 1hari
		const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '1d'})
			const {_id, nama} = user;
			// console.log(_id, nama, email)

			// jika berhasil login akan redirect
			// res.redirect('/');
			return res.json({message: 'berhasil login'})

	},
	// proses aktivasi akun
	activateAccount: async (req, res) => {
		const token = req.params.token;
	
		//jika ada token dan tokennya benar
		if(token){
			// console.log(token)
			// proses verifikasi token dengan encoded token yang ada
			jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function(err, decodedToken){
				// jika terjadi error
				if(err){
					return res.status(400).json({error: 'Link salah atau kadaluarsa'})
				}
				const secToken = token
				const {nama,email,biodata,password,isAdmin}=decodedToken;
	
				// proses enkripsi password
				// bcrypt.hash(password, 10, function(err, hash) {
				// const password= hash 
	
				// pencarian user berdasarkan email yang ada dalam DB
					User.findOne({email}).exec((err, user) => {
	
						// jika email sudah ada
						if(user){
							return res.status(400).json({error: "Sudah ada pengguna dengan email ini"});
						}
	
	
						// proses aktivasi lalu penyimpanan data user
						let newUser = new User({nama, email,biodata, password,isAdmin,secToken});
						newUser.save((err, success) => {
	
							// juka terjai kesalahan
							if(err){
								return res.status(400), json({error: 'Terjadi kesalahan saat aktivasi akun'})
							}
							// res.json({
							// 	message: "Signup success"
							// })
	
							// jika berhasil akan diarahkan ke homepage
							  res.redirect('/');
						})
	
					});
				// });
			})
		}else{ //jika tidak ada token / token salah
			return res.json({error: "Oppp !! Terjadi Kesalahan !!!"})
		}
	},
	
// lupa password 
// karena belum terkoneksi denga FE jadi untuk inputan password baru (reset password) hanya bisa dilakukan di postman dengan memasukkan password baru dan juga token yang dikirim dalam email
// jadi belum bisa update password dengan klik link yang ada di email, harus menunggu FE
	forgotPassword : (req, res) => {
		const {email} = req.body;

		User.findOne({email}).exec((err, user) => {
			if(err || !user){
				return res.status(400).json({error: "Pengguna dengan email ini tidak ada"})
			}

			const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn:'10m'});
			const data = {
				from: 'admin@wadudu.com',
				to: email,
				subject: 'Permintaan perubahan password',
				html:`
					<h2>Klik disini untuk mengganti password</h2>
					<p>http://localhost:8030/reset-password/${token}</p>
					<p>${token}</p>
				`
			};
			
			// proses penggantian password
			return user.updateOne({resetLink: token}, function(err, success){
				if(err){
					return res.status(400).json({error: "Link perubahan password salah"});
				}else{
					mg.messages().send(data, function (error, body) {
						if(error){
							return res.json({
								error: err.message
							})
						}
						return res.json({message: 'Email perubahan password sudah dikirim, cek emailmu'})
					});
				}
			})
		})
	},
	// karena belum terkoneksi denga FE jadi untuk inputan password baru (reset password) hanya bisa dilakukan di postman dengan memasukkan password baru dan juga token yang dikirim dalam email
	// jadi belum bisa update password dengan klik link yang ada di email, harus menunggu FE
	resetPassword: (req, res) => {
		console.log(req.params)
		const resetLink = req.params.resetLink;
		const password = req.body.newPass;
	
		console.log(password)
	
		if(resetLink){
			jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function(error, decodeData){
				if(error){
					return res.status(401).json({
						error: "Token salah atau kadaluarsa"
					})
				}
	
				bcrypt.hash(password, 10, function(err, hash) {
				const password= hash 
				console.log(password)
	
					User.findOne({resetLink}).exec((err, user) => {
	
						if(err || !user){
						return res.status(400).json({error: "Pengguna dengan token ini tidak ada"})
					}
	
						const obj = {
						password: password,
						resetLink:''
					}
	
					user = _.extend(user, obj);
	
						user.save().then(user => {
						res.json('Password diganti');
						})
						.catch(err => {
						res.status(400).send("Maaf terjadi kesalahan saat penggantian password");
						});
					});
				});
			})
		}else{
			return res.status(401).json({error: "Authentication Error!!!"})
		}
	},

	logout: async (req, res) => {
		req.session.destroy()
		return res.status(200).send("berhasil logout")
	}
	
};



