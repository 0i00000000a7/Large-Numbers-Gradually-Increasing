time = localStorage.getItem('LNGI') !== undefined ? Number(localStorage.getItem('LNGI')) : 0;
test = 0
endScreenShowed = false
isShowingMilestone = false
milestones = [0,8525,13166,16627,22450,33938,52391,80131,89348,130069,133649,185817,229228,233834,288198]
milestoneDisplays = ['0','10,000,000,000','10<sup>100</sup>','10<sup>1,000,000</sup>','10<sup>10<sup>100</sup></sup>','10<sup>10<sup>10<sup>10,000,000,000</sup></sup></sup>','10^^10','10^^10^^10^^10','10^^^1,000,000','10^^^^5','10{10}10','10{1,000,000}10','10{10{10{10{10}10}10}10}10','10{{1}}1,000','10{{2}}5']
Infinity_symbol = '<div class="rotate-90">8</div>'
totalTime = 288198

function update() {
  time++
  if (time>=288198) time = 288198
  localStorage.setItem('LNGI',time)
  document.getElementById("number").innerHTML = timeToNumber(time)
  document.getElementById("milestones").innerHTML = getMilestoneText()
  document.getElementById("popup").innerHTML = getMilestonePopup()
  document.getElementById("popup").style.display = (isShowingMilestone)? 'block' : 'none'
  if (time < totalTime) {
    document.getElementById("countdown").innerHTML = "距离当前结局还有" + formatTime(totalTime - time)
  }
  if (time >= totalTime && !endScreenShowed) {
    document.getElementById("countdown").innerHTML = "距离当前结局还有0分钟 0.00秒"
    endScreenShowed = true
    document.getElementById("countdown").classList.add('hide');
    document.getElementById("milestones").classList.add('hide');
    setTimeout(function(){
      document.getElementById("countdown").innerHTML = "已到达当前结局"
      document.getElementById("countdown").classList.remove('hide');
    },1500)
  }
}

function timeToNumber(x) {
  //0 < x < 1e15
  if (x < 10888) {
    return Math.floor((1.001 + x / 5e6) ** x + 0.01 * x - 1).toLocaleString()
  }
  //1e15 < x < 1e100
  else if (x < 13166) {
    return "10<sup>" + ((1 + x / 7e6) ** (x - 10803) + 0.0006 * x + 7.3).toFixed(1) + "</sup>"
  }
  //1e100 < x < ee6
  else if (x < 16627) {
    return "10<sup>" + (Math.floor((1 + x / 7e6) ** (x - 10803) + 0.0006 * x + 7.3)).toLocaleString() + "</sup>"
  }
  //1e1e6 < x < 10^^9
  else if (x < 52011) {
    return "10<sup>" + timeToNumber(x * 1.2 - 13769) + "</sup>"
  }
  //10^^9 < x < 10^^100
  else if (x < 55512) {
    return '10^^' + (1.002 ** (x - 52055) + 0.00008 * x + 3.85).toFixed(2)
  }
  //10^100 < x < 10^^10^^10^^10
  else if (x < 80131) {
    return "10^^" + timeToNumber((x - 53690) ** 1.1)
  }
  //10^^^4 < x < 10^^^1e6
  else if (x < 89348) {
    return "10^^^" + Number((1.0015 ** (x - 80131) + 0.00008 * x - 3.41).toFixed(2)).toLocaleString()
  //10^^^1e6 < x
  } else if (x < 130069) {
    return "10^^^" + timeToNumber((x - 86550) ** 1.1)
  } else if (x < 132569) {
    return "10^^^^" + Number(((( x - 130069) / 500)  + 5).toFixed(2)).toLocaleString()
  } else if (x < 185817) {
    a = ((1.01 ** ((x - 116394) / 100)) ** 2) - 20
    c = Math.floor(a)
    b = (10 ** ((a - c) * (1 - Math.log10(2)) + Math.log10(2))).toFixed(2)
    if (c<10) return 10 + '^'.repeat(c) + b
    return `10{${c.toLocaleString()}}${b}`
  } else if (x < 229228) {
    return '10{' + timeToNumber((x - 183836) ** 1.15) + '}10'
  } else if (x < 233834) {
    return "10{{1}}"+Number((1.0015 ** (x - 229228) + 0.00008 * x - 14.34).toFixed(2)).toLocaleString()
  } else if (x < 288198) {
    return '10{{1}}' + timeToNumber((x - 232515) ** 1.15)
  } else {
    return '10{{2}}5'
  }
}

setInterval(update, 10)

function formatTime(t) {
  return Math.floor(t / 6000) + "分钟 " + ((t / 100) % 60).toFixed(2) + "秒"
}

  
function getMilestoneText() {  
  // 找到大于time的最小里程碑索引  
  var index = milestones.findIndex(function(milestone) {  
    return milestone > time;  
  });  
  
  // 如果没有找到大于time的里程碑（即index为-1）  
  if (index === -1) {  
    // 返回已达到所有里程碑的信息  
    return '已达到所有里程碑';  
  } else {  
    // 返回最近的里程碑信息  
    percent = ' (' + (((time - milestones[index - 1]) / (milestones[index] - milestones[index - 1]) * 100).toFixed(2) + '%') + ')'
    return '最近的里程碑：' + milestoneDisplays[index] + percent;  
  }  
}  
function getMilestonePopup() {
  mst = ''
  for (var i = 0; i < milestones.length; i++) {  
    // 计算完成百分比，确保至少为1%  
    var percentage = format((time / milestones[i]) * 100);  
    
    // 显示里程碑和完成百分比  
    mst+=('里程碑' + (i + 1) + '：要求：' + milestoneDisplays[i] + ' 已完成' + percentage + '%' + '<br>');  
  }
  mst+=`<br><button class='btn' onclick="isShowingMilestone = false">关闭</btn>`
  return mst
}
function format(num) {
  if (Number.isFinite(num)) return num.toFixed(2)
  else if (Math.sign(num) == -1) return '-<div class="rotate-90">8</div>'
  else return '+<div class="rotate-90">8</div>'
}
console.log('总计时间：' + formatTime(totalTime))