time = localStorage.getItem('LNGI') !== undefined ? Number(localStorage.getItem('LNGI')) : 0;
test = 0
endScreenShowed = false
isShowingMilestone = false
milestones = [0, 8525, 13166, 16627, 22450, 33938, 52391, 80131, 89348, 130069, 133649, 185817, 229228, 233834, 288198, 1033200, 1857554, 2.2631e6, 3199950, 4237676, 4691841, 5096805]
milestoneDisplays = ['0',
'10,000,000,000',
'10<sup>100</sup>',
'10<sup>1,000,000</sup>',
'10<sup>10<sup>100</sup></sup>',
'10<sup>10<sup>10<sup>10,000,000,000</sup></sup></sup>',
`10${cA(3,'^^')}10`,
`10${cA(3,'^^')}10${cA(3,'^^')}10${cA(3,'^^')}10`,
`10${cA(3,'^^^')}1,000,000`,
`10${cA(3,'^^^^')}5`,
`10${cA(4,'{')}${cA(3,'10')}${cA(4,'}')}10`,
`10${cA(4,'{')}${cA(3,'1,000,000')}${cA(4,'}')}10`,
`10${cA(4,'{')}10${cA(4,'{')}10${cA(4,'{')}10${cA(4,'{')}${cA(3,'10')}${cA(4,'}')}10${cA(4,'}')}10${cA(4,'}')}10${cA(4,'}')}10`,
`10${cA(4,'{{')}${cA(3,1)}${cA(4,'}}')}1,000`,
`10${cA(4,'{{')}${cA(3,2)}${cA(4,'}}')}5`,
`10${cA(4,'{{')}${cA(3,3)}${cA(4,'}}')}6`,
`10${cA(4,'{{')}${cA(3,1000000)}${cA(4,'}}')}10`,
`10${cA(4,'{{{')}${cA(3,'1,000,000')}${cA(4,'}}}')}10`,
`{${cA(1,10)},${cA(2,10)},${cA(3,10)},${cA(4,'1,000,000')}}`,
`{${cA(1,10)},${cA(2,10)},${cA(3,1)},${cA(4,1)},${cA(5,2)}}`,
`{${cA(1,10)},${cA(2,10)},${cA(3,10)},${cA(4,10)},${cA(5,10)}}`,
`{${cA(1,10)},${cA(2,10)},${cA(3,10)},${cA(4,10)},${cA(5,10)},${cA(6,10)}}`,
]

Infinity_symbol = '<div class="rotate-90">8</div>'
totalTime = 5096805

function update() {
  if (time >= 288198) time += ((Math.log10(time+1)+1)*4)
  else time++
  if (time >= 5096805) time = 5096805
  if (time >= Number.MAX_VALUE) time = Number.MAX_VALUE
  localStorage.setItem('LNGI', time)
  document.getElementById("number").innerHTML = timeToNumber(time)
  document.getElementById("milestones").innerHTML = getMilestoneText()
  document.getElementById("popup").innerHTML = getMilestonePopup()
  document.getElementById("popup").style.display = (isShowingMilestone) ? 'block' : 'none'
  if (time < totalTime) {
    document.getElementById("countdown").innerHTML = "模拟已运行" + formatTime(time)
  }
  if (time >= totalTime && !endScreenShowed) {
    document.getElementById("countdown").innerHTML = "模拟已运行"+formatTime(time)
    endScreenShowed = true
    document.getElementById("countdown").classList.add('hide');
    document.getElementById("milestones").classList.add('hide');
    setTimeout(function() {
      setInterval(function(){
        document.getElementById("countdown").innerHTML = "已达结局："+formatTime(time)
      })
      document.getElementById("countdown").classList.remove('hide');
    }, 1500)
  }
}

function timeToNumber(x) {
  //0 < x < 1e15
  if(x < 10888) {
    return Math.floor((1.001 + x / 5e6) ** x + 0.01 * x - 1).toLocaleString()
  }
  //1e15 < x < 1e100
  else if(x < 13166) {
    return "10<sup>" + ((1 + x / 7e6) ** (x - 10803) + 0.0006 * x + 7.3).toFixed(1) + "</sup>"
  }
  //1e100 < x < ee6
  else if(x < 16627) {
    return "10<sup>" + (Math.floor((1 + x / 7e6) ** (x - 10803) + 0.0006 * x + 7.3)).toLocaleString() + "</sup>"
  }
  //1e1e6 < x < 10^^9
  else if(x < 52011) {
    return "10<sup>" + timeToNumber(x * 1.2 - 13769) + "</sup>"
  }
  //10^^9 < x < 10^^100
  else if(x < 55512) {
    return `10${cA(3,'^^')}` + (1.002 ** (x - 52055) + 0.00008 * x + 3.85).toFixed(2)
  }
  //10^100 < x < 10^^10^^10^^10
  else if(x < 80131) {
    return `10${cA(3,'^^')}` + timeToNumber((x - 53690) ** 1.1)
  }
  //10^^^4 < x < 10^^^1e6
  else if(x < 89348) {
    return `10${cA(3,'^^^')}` + Number((1.0015 ** (x - 80131) + 0.00008 * x - 3.41).toFixed(2)).toLocaleString()
    //10^^^1e6 < x
  } else if(x < 130069) {
    return `10${cA(3,'^^^')}` + timeToNumber((x - 86550) ** 1.1)
  } else if(x < 132569) {
    return `10${cA(3,'^^^^')}` + Number((((x - 130069) / 500) + 5).toFixed(2)).toLocaleString()
  } else if(x < 185817) {
    a = ((1.01 ** ((x - 116394) / 100)) ** 2) - 20
    c = Math.floor(a)
    b = (10 ** ((a - c) * (1 - Math.log10(2)) + Math.log10(2))).toFixed(2)
    if(c < 10) return 10 + cA(3,'^'.repeat(c)) + b
    return `10${cA(4,'{')}${cA(3,c.toLocaleString())}${cA(4,'}')}${b}`
  } else if(x < 229228) {
    return `10${cA(4,'{')}` + timeToNumber((x - 183836) ** 1.15) + `${cA(4,'}')}10`
  } else if(x < 233834) {
    return `10${cA(4,'{{')}${cA(3,'1')}${cA(4,'}}')}` + Number((1.0015 ** (x - 229228) + 0.00008 * x - 14.34).toFixed(2)).toLocaleString()
  } else if(x < 288198) {
    return `10${cA(4,'{{')}${cA(3,'1')}${cA(4,'}}')}` + timeToNumber((x - 232515) ** 1.15)
  } else if(x < 1033200) {
    return `10${cA(4,'{{')}${cA(3,'2')}${cA(4,'}}')}` + timeToNumber((x - 287800) * 1.2)
  } else if(x < 1233000) {
    return `10${cA(4,'{{')}${cA(3,'3')}${cA(4,'}}')}` + Number((((x - 1033200) / 50000) + 6).toFixed(2)).toLocaleString()
  } else if(x < 1857554) {
    a = ((1.01 ** ((x - 1163330) / 1000)) ** 2)
    c = Math.floor(a)
    b = (10 ** ((a - c) * (1 - Math.log10(2)) + Math.log10(2))).toFixed(2)
    return `10${cA(4,'{{')}${cA(3,c.toLocaleString())}${cA(4,'}}')}${b}`
  } else if (x < 2178480) {
    return `10${cA(4,'{{')}${timeToNumber((x - 1855573) ** 1.15)}${cA(4,'}}')}10`
  } else if (x < 2.2631e6) {
    a = ((1.01 ** ((x - 2178480) / 750)) ** 2) + Math.log(12.5) / Math.log(5)
    c = Math.floor(a)
    b = (10 ** ((a - c) * (1 - Math.log10(2)) + Math.log10(2))).toFixed(2)
    return `10${cA(4,'{{{')}${cA(3,c.toLocaleString())}${cA(4,'}}}')}${b}`
  } else if (x < 3199950){
    a = ((1.01 ** ((x - 2158608) / 1500)) ** 2)
    b = Math.floor(a)
    c = 10 ** (a-b)
    d = Math.floor(c)
    e = (10 ** ((c - d) * (1 - Math.log10(2)) + Math.log10(2))).toFixed(2)
    if (a < 6) return '10' + cA(4,'{'.repeat(b) + cA(3,d) + '}'.repeat(b)) + e
    return `{${cA(1,10)},${cA(2,Math.floor(e))},${cA(3,d)},${cA(4,b.toLocaleString())}}`
  } else if (x < 4237676) {
    return `{${cA(1,10)},${cA(2,10)},${cA(3,10)},${timeToNumber((x - 3197150) ** 1.1)}}`
  } else if (x < 4289000) {
    a = Math.floor((x - 4237676) / 10000 + 5)
    return `{${cA(1,10)},${cA(2,a)},${cA(3,1)},${cA(4,1)},${cA(5,2)}}`
  } else if (x < 4691841) {
    e = ((1.01 ** ((x - 4289000) / 3500)) ** 2)+1.12
    d = Math.floor(e)
    c = 10 ** (e - d)
    b = 10 ** (c - Math.floor(c))
    a = (10 ** ((b - Math.floor(b)) * (1 - Math.log10(2)) + Math.log10(2))).toFixed(2)
    return `{${cA(1,10)},${cA(2,Math.floor(a))},${cA(3,Math.floor(b))},${cA(4,Math.floor(c))},${cA(5,d)}}`
  } else if (x < 5096805) {
    e = ((1.01 ** ((x - 4691841) / 3500)) ** 2) + 1
    d = 10 ** (e - Math.floor(e))
    c = 10 ** (d - Math.floor(d))
    b = 10 ** (c - Math.floor(c))
    a = (10 ** ((b - Math.floor(b)) * (1 - Math.log10(2)) + Math.log10(2))).toFixed(2)
    return `{${cA(1,10)},${cA(2,Math.floor(a))},${cA(3,Math.floor(b))},${cA(4,Math.floor(c))},${cA(5,Math.floor(d))},${cA(6,Math.floor(e))}}`
  } else {
    return `{${cA(1,10)},${cA(2,10)},${cA(3,10)},${cA(4,10)},${cA(5,10)},${cA(6,10)}}`
  }
}
setInterval(update, 10)

function formatTime(t) {  
  const totalSeconds = Math.floor(t / 100); // 总秒数  
  const days = Math.floor(totalSeconds / (24 * 60 * 60)); // 天数  
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)); // 小时数  
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60); // 分钟数  
  const seconds = (totalSeconds % 60).toFixed(0); // 秒数，保留两位小数  
  
  let formattedTime = "";  
  
  if (days > 0) {  
    formattedTime += days + "天 ";  
  }  
  
  if (hours > 0) {  
    formattedTime += hours + "小时 ";  
  }  
  
  if (minutes > 0) { // 如果已经有天数或小时数，或者分钟数大于0，则显示分钟  
    formattedTime += minutes + "分钟 ";  
  }  
  
  formattedTime += seconds + "秒";  
  
  return formattedTime;  
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
  for(var i = 0; i < milestones.length; i++) {
    var percentage = format((time / milestones[i]) * 100);
    mst += ('里程碑' + (i + 1) + '：要求：' + milestoneDisplays[i] + ' 已完成' + percentage + '%' + '<br>');
  }
  mst += `<br><button class='btn' onclick="isShowingMilestone = false">关闭</btn>`
  return mst
}

function format(num) {
  if (Number.isFinite(num)) {
    if (num < 1e3 && num > 0.1) return num.toFixed(2)
    else {
      exponent = Math.floor(Math.log10(num))
      mantissa = num / (10 ** exponent)
      return mantissa.toFixed(3) + 'e' + exponent
    }
  }
  else if (Math.sign(num) == -1) return '-' + Infinity_symbol
  else return '+' + Infinity_symbol
}
console.log('总计时间：' + formatTime(totalTime))

function cA(i,num) {
  function a(color) {return colorText(color, num)}
  var x
  switch (i) {
    case 1: return a('red')
    case 2: return a('#B0503E')
    case 3: return a('#A45CC1')
    case 4: return a('#53D76B')
    case 5: return a('#F1BAED')
    case 6: return a('#D5736F')
  }
}
function colorText(color, text) {
  return "<span" + " style='color:" + color + "'>" + text + "</span>"
}