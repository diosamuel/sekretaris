vm = new Vue({
    el: '#app',
    data: {
        pesanAbsen:'',
        pesanBelajar:'',
        listAbsen: '',
        pos: 0,
        dataHariIni: [],
        result_acakKelompok: '',
        pelajaran: [
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
            "kwu"
        ],
        siswa: [{
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
                "nama": "nafilah",
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
        ],
        katakata:['😏Inget, udah mau lulus','😱 Siapa yg absen hari ini?','Tadi belajar apa ya? 🤔','Udah piket hari ini?'],
        katanya:""
    },
    mounted() {
            setInterval(()=>{
                this.katanya=this.katakata[Math.floor(Math.random()*this.katakata.length)]
            },2000)
    },
    computed: {
        date() {
            moment.locale('id')
            return moment().format('dddd, LL')
        }
    },
    methods: {
        tambah() {
            this.dataHariIni.push({
                id: this.pos
            })
            this.pos++
        },
        save() {
            hasContent = this.dataHariIni.filter(x => !x.ket == false)
            var pesan = ""
            pesan += `Agenda KBM Hari ${moment().format('dddd, LL')} :\n`
            hasContent.forEach(x => {
                pesan += "\n"
                pesan += `*${x.class}* : ${x.ket}, ${eval(x.tugas)?'+ '+x.judulTugas:'(tidak ada tugas)'}`
                pesan += "\n"
            })
            location.href = "whatsapp://send?text=" + encodeURIComponent(pesan)
            this.pesanBelajar=pesan
            console.log(pesan)
        },
        saveAbsen() {
            var pesan = ""
            pesan += `*Kehadiran (${moment().format('dddd, LL')}) kelas 12 IPA SMA PLUS LOGOS :*\n`
            hadir = 0
            tidakHadir = {
                pos: 0,
                nama: []
            }
            this.siswa.forEach(x => {
                if (x.absen == true) {
                    hadir++
                } else {
                    tidakHadir.pos++
                    tidakHadir.nama.push({
                        nama: x.nama[0].toUpperCase() + x.nama.slice(1),
                        ket: x.ket
                    })
                }
            })

            pesan += `\nHadir : ${hadir}\n`
            pesan += `Tidak Hadir : ${tidakHadir.pos}\n\n`
            pesan += tidakHadir.nama.length <= 0 ? '' : 'Absen :'
            tidakHadir.nama.forEach(x => {
                pesan += `\n${x.nama} (${x.ket?x.ket:'Tanpa Keterangan'})`
            })
            location.href = "whatsapp://send?text=" + encodeURIComponent(pesan)
            console.log(pesan)
            this.pesanAbsen=pesan
        },
        prosesList() {
            listAbsen = this.listAbsen.split(/\n/).map(x => x.toLowerCase()).sort()
            this.siswa.forEach(x => {
                listAbsen.forEach(y => {
                    if (y.includes(x.nama)) {
                        x.absen = true
                    }
                })
            })
            // console.log(listAbsen)
        },
        deleteMapel(id){
            isDeleteMapel = confirm(`Hapus ${this.dataHariIni.filter(x=>x.id==id)[0].class?this.dataHariIni.filter(x=>x.id==id)[0].class:''} ?`)
            if(isDeleteMapel){
                this.dataHariIni=this.dataHariIni.filter(x=>x.id!==id)
            }    
        },
        //util
        centangSemua() {
            if(document.getElementById("btn-hadir").innerText=='Semua hadir!'){
                document.getElementById("btn-hadir").innerText='Semua tidak hadir!';
            }
            else{
                document.getElementById("btn-hadir").innerText='Semua hadir!';
            }

            if(this.siswa.every(x=>x.absen==true)){
                this.siswa = this.siswa.map(x => a = {
                    nama: x.nama,
                    absen: false,
                    ket: ''
                })
            }else{
                this.siswa = this.siswa.map(x => a = {
                    nama: x.nama,
                    absen: true,
                    ket: ''
                })
            }
        },
    },
    watch:{
        dataHariIni(x){
            this.dataHariIni.map((x,y)=>x.id=y)
        }
    }
})
