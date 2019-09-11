let w = window;

w.DEBUG = true;  
w.entities = [];
w.tick = 0; 

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
w.ran = _ => Math.random(); 

// 
w.ranInt = i => Math.round(Math.random() * i);

// 
w.oneIn = i => Math.round(Math.random() * i) === i; 


export default w; 