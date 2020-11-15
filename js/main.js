vm=new Vue({
	el:'#app',
	data:{
    listAbsen:'',
    nameError:[],
    pos:0,
		dataHariIni:[],
		pelajaran:[
			"bahasa indonesia",
			"kimia",
			"fisika",
			"biologi",
			"pkn",
			"mtk wajib",
			"mtk minat",
			"PAI",
			"PAK",
			"bahasa inggris",
			"sastra inggris",
			"bahasa jepang",
			"bahasa sunda",
			"pjok",
			"sbk",
			"bk",
			"sejarah",
			"tik",
			],
		alat:['ZOOM','LMS','Google Classroom','Video Call Whatsapp','Google Meet','Whatsapp',],
		siswa:[
  {
    "nama": "abdul",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "alawiyah",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "amanda",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "arfan",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "arta",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "atika",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "atthariq",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "bagas",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "bangkit",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "edvan",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "intan",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "ira",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "jibal",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "kayla",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "lovian",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "m.faidhil iman",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "m.farras muhadzib",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "mulkan",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "rahma",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "ridho",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "silvy",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "suci",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "sudaffa",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "thio",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "virdio",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "zaskia",
    "absen": false,
    "ket": ""
  },
  {
    "nama": "zullhaji",
    "absen": false,
    "ket": ""
  }
]
	},
	mounted(){
	},
	computed:{
		date(){
			moment.locale('id')
			return moment().format('dddd, LL')
		}
	},
	methods:{
		tambah(){
			this.dataHariIni.push({
				id:this.pos
			})	
      this.pos++
		},
		save(){
			hasContent = this.dataHariIni.filter(x=>!x.ket==false)
			var pesan=""
			pesan+=`Agenda KBM Hari ${moment().format('dddd, LL')} :\n`
			hasContent.forEach(x=>{
				pesan +="\n"
				pesan +=`*${x.class}* : ${x.ket}`
				pesan +="\n"
			})
			location.href="whatsapp://send?text="+encodeURIComponent(pesan)
		},
		saveAbsen(){
			var pesan = ""
			pesan+=`*Kehadiran (${moment().format('dddd, LL')}) kelas 11 IPA SMA PLUS LOGOS :*\n`
			hadir=0
			tidakHadir={
				pos:0,
				nama:[]
			}
			this.siswa.forEach(x=>{
				if(x.absen==true){
					hadir++
				}else{
					tidakHadir.pos++
					tidakHadir.nama.push({nama:x.nama[0].toUpperCase()+x.nama.slice(1),ket:x.ket})
				}
			})

			pesan+=`\nHadir : ${hadir}\n`
			pesan+=`Tidak Hadir : ${tidakHadir.pos}\n\n`
			pesan+=tidakHadir.nama.length<=0?'':'Absen :'
			tidakHadir.nama.forEach(x=>{
				pesan+=`\n${x.nama} (${x.ket?x.ket:'Tanpa Keterangan'})`
			})
			location.href="whatsapp://send?text="+encodeURIComponent(pesan)
      console.log(pesan)
		},
    prosesList(){
      listAbsen = this.listAbsen.split(/\n/).map(x=>x.toLowerCase()).sort()
      this.siswa.forEach(x=>{
        listAbsen.forEach(y=>{
          if(y.includes(x.nama)){
            x.absen=true
          }
        })
      })
      // console.log(listAbsen)
    },
    //util
		centangSemua(){
			this.siswa=this.siswa.map(x=>a={nama:x.nama,absen:true,ket:''})
		}
	},
})