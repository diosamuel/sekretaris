vm=new Vue({
	el:'#app',
	data:{
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
				id:this.dataHariIni.length
			})	
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
		}
	},
})