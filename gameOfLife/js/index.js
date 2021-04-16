//初始化canvas及配置参数
var canvas = document.getElementById('canvas')
var context = canvas.getContext("2d")
var map ={
    x : 100,
    y : 100
}
var speed = 300
canvas.width = 8 * map.x
canvas.height = 8 * map.y
//生命数组
var lives = []
for (let i = 0; i < map.x; i++) {
    lives[i] = []
    for (let j = 0; j < map.y; j++) {
        lives[i].push('white')        
    }   
}
//填满
function draw(){
    context.clearRect(0,0,canvas.width,context.height)
    for(let i = 0;i < map.x; i++){
        for (let j = 0; j < map.y; j++) {
            context.fillStyle = lives[i][j]
            context.fillRect(i * 8,j * 8,7,7)
        }
    }
    change()
}
//生成初始值
function seed(){
    var seeds = 2000
    for (let i = 0; i < seeds; i++) {
        lives[parseInt(Math.random()*map.x)][parseInt(Math.random()*map.y)] = 'black'        
    }
}
//开始变化
function change(){
    var next = []
    var count = 0
    for (let i = 0; i < map.x; i++) {
        var xm = (i - 1 + map.x) % map.x
        var xp = (i + 1) % map.x
        next[i] = []
        for (let j = 0; j < map.y; j++) {
            var ym = (j - 1 + map.y) % map.y
            var yp = (j + 1) % map.y
            var checkBox = [lives[xm][ym],lives[i][ym],lives[xp][ym],
                            lives[xm][j],              lives[xp][j],
                            lives[xm][yp],lives[i][yp],lives[xp][yp],]
            count = 0
            checkBox.forEach(val=>{if (val == 'black') {
                count++
            }})
            //console.log(count)
            if (count == 3) {
                next[i][j] = 'black'
            }           
            else if(count == 2){
                next[i][j] = lives[i][j]
            }
            else{
                next[i][j] = 'white'
            }
        }
    }
    lives = next
}

seed()
//draw()
setInterval(draw,speed)