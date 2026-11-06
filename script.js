(function(){
  var cont=document.getElementById('estudiantes');
  for(var i=1;i<=3;i++){
    var d=document.createElement('div');
    d.className='card student';
    d.dataset.i=i;
    d.innerHTML='<h2>Estudiante '+i+'</h2>'+
      '<label>Nombre del estudiante</label>'+
      '<input class="nombre" placeholder="Nombre completo">'+
      '<div class="grid">'+
      [1,2,3,4].map(function(n){return '<div><label>Nota '+n+'</label><input class="nota" type="number" min="0" max="5" step="0.1" inputmode="decimal" placeholder="0.0"></div>';}).join('')+
      '</div><div class="res"></div>';
    cont.appendChild(d);
  }

  function calcular(card){
    var vals=[].slice.call(card.querySelectorAll('.nota')).map(function(x){return x.value===''?null:parseFloat(x.value);});
    var res=card.querySelector('.res');
    var hay=vals.filter(function(v){return v!==null&&!isNaN(v);});
    if(!hay.length){res.textContent='';return;}
    if(hay.some(function(v){return v<0||v>5;})){res.innerHTML='<span class="bad">Las notas deben estar entre 0 y 5.</span>';return;}
    var prom=hay.reduce(function(a,b){return a+b;},0)/hay.length;
    var completo=hay.length===4;
    var estado=prom>=3.5?'<span class="ok">✔ Aprobado</span>':'<span class="bad">✘ Desaprobado</span>';
    res.innerHTML='Promedio: '+prom.toFixed(2)+(completo?' — '+estado:' <small>(faltan notas)</small>');
  }

  cont.addEventListener('input',function(e){
    var card=e.target.closest('.student');
    if(card)calcular(card);
  });

  function entrar(){
    var n=document.getElementById('docente').value.trim();
    if(!n){document.getElementById('docente').focus();return;}
    document.getElementById('saludo').textContent='👋 Bienvenido(a), docente '+n+'.';
    document.getElementById('login').hidden=true;
    document.getElementById('panel').hidden=false;
  }
  document.getElementById('entrar').onclick=entrar;
  document.getElementById('docente').addEventListener('keydown',function(e){if(e.key==='Enter')entrar();});

  document.getElementById('limpiar').onclick=function(){
    cont.querySelectorAll('input').forEach(function(x){x.value='';});
    cont.querySelectorAll('.res').forEach(function(x){x.textContent='';});
  };
})();
