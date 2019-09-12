let w = window;

w.DEBUG = false;  
w.entities = [];
w.tick = 0; 

w.restart = _ => {

};

// set in canvas
w.getCenter = _ => {};

// 
w.sq = i => Math.pow(i,2)

// 
w.sqDist = (p1, p2) => {
  return w.sq(p1.x - p2.x) + w.sq(p1.y - p2.y)
}

// 
w.hyp = (p1, p2) => {
  return Math.sqrt(p1*p1+p2*p2)
}

// 
w.ran = (i = 1) => Math.random() * i; 

// 
w.ranNorm = (i = 1) => (Math.random() - 0.5) * i;

// 
w.ranInt = i => Math.round(Math.random() * i);

// 
w.oneIn = i => Math.round(Math.random() * i) === i; 

// 
w.ranSeq = i => {
  let x = Math.sin(i * 100000);
  return x - Math.floor(x);
}

w.next = (arr, val) => {
  let id = arr.indexOf(val)
  if(id !== -1) {
    return id + 1 < arr.length ? arr[id+1] : arr[0];
  }
}

export default w; 