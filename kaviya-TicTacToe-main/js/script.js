(function(){

   var Player = "X"
   var Game = []
   var Move = 0
   var NewGame = null
   var Id = 0
   var Msg = "Game Ends"
   var GameEnds = false
   
   var Check = (val1, val2, val3, player)=>{ 
       if(Game[val1] == Player && Game[val2] == Player && Game[val3] == Player){
           return true;
       }
   }
   
   
   const Header = {
     view: () => {
       return m("div[align=center]",[
           m("h1","TIC TAC TOE"),
           GameEnds?m("p",Msg):m("p",Player + "'s Turn")
       ])
     }
   }
   
   const Cell = {
     oninit: vnode => {
       Id++
       vnode.state.player = '',
       vnode.state.style = '',
       vnode.state.clicked = false,
       vnode.state.id = Id
     },  
     view: (vnode) => {
       return m(".cell"+vnode.state.style,{onclick:()=>{
         if(!vnode.state.clicked){
            vnode.state.player = Player
            vnode.state.style = "[style='cursor: default']"
            vnode.state.clicked = true
            NewGame = false
            Player=="X"?Player="O":Player="X"
            Game[vnode.state.id-1] = vnode.state.player
            Move++
   
            //start checking for wins
            if(Move > 4){
             //Check for wins
              if(Game[0] == "X" && Game[1] == "X" && Game[2] == "X"){ GameEnds = true;Msg = "X wins!!!"}
              // else if(Check(3, 4, 5, "X")){ GameEnds = true;Msg = "X wincdcs!!!"}
              else if(Game[3] == "X" && Game[4] == "X" && Game[5] == "X"){ GameEnds = true;Msg = "X wins!!!"}
              else if(Game[6] == "X" && Game[7] == "X" && Game[8] == "X"){ GameEnds = true;Msg = "X wins!!!"}
              else if(Game[0] == "O" && Game[1] == "O" && Game[2] == "O"){ GameEnds = true;Msg = "O wins!!!"}
              else if(Game[3] == "O" && Game[4] == "O" && Game[5] == "O"){ GameEnds = true;Msg = "O wins!!!"}
              else if(Game[6] == "O" && Game[7] == "O" && Game[8] == "O"){ GameEnds = true;Msg = "O wins!!!"}
              else if(Game[0] == "X" && Game[3] == "X" && Game[6] == "X"){ GameEnds = true;Msg = "X wins!!!"}
              else if(Game[1] == "X" && Game[4] == "X" && Game[7] == "X"){ GameEnds = true;Msg = "X wins!!!"}
              else if(Game[2] == "X" && Game[5] == "X" && Game[8] == "X"){ GameEnds = true;Msg = "X wins!!!"}
              else if(Game[0] == "O" && Game[3] == "O" && Game[6] == "O"){ GameEnds = true;Msg = "O wins!!!"}
              else if(Game[1] == "O" && Game[4] == "O" && Game[7] == "O"){ GameEnds = true;Msg = "O wins!!!"}
              else if(Game[2] == "O" && Game[5] == "O" && Game[8] == "O"){ GameEnds = true;Msg = "O wins!!!"}
              else if(Game[0] == "X" && Game[4] == "X" && Game[8] == "X"){ GameEnds = true;Msg = "X wins!!!"}
              else if(Game[2] == "X" && Game[4] == "X" && Game[6] == "X"){ GameEnds = true;Msg = "X wins!!!"}
              else if(Game[0] == "O" && Game[4] == "O" && Game[8] == "O"){ GameEnds = true;Msg = "O wins!!!"}
              else if(Game[2] == "O" && Game[4] == "O" && Game[6] == "O"){ GameEnds = true;Msg = "O wins!!!"}
              else if(Move == 9){ GameEnds = true;Msg = "Draw" }
            }
         }
       }},vnode.state.player) 
     },
     onupdate:(vnode)=>{
         if(NewGame == true){
           vnode.state.player = ""
           vnode.state.style = "[style='cursor: pointer']"
           vnode.state.clicked = false
           Game = []
           Move = 0
           Player = "X"
           GameEnds = false
           setTimeout(()=>{NewGame = null},50)
         }else if(GameEnds == true){
           vnode.state.style = "[style='cursor: default']"
           vnode.state.clicked = true
         }     
       }
   }
   
   const Row = {
     view: () => {
       return m(".row",[
          m(Cell),
          m(Cell),
          m(Cell),
         ])
     }
   }
   
   const Main = {
     view: ()=>{
       return m("div.board[style='padding: 15px 0']",[
          m(Row),
          m(Row),
          m(Row),
       ])
     } 
   }
   
   const Button = {
     oninit:(vnode)=>{
       vnode.state.style = "[disabled]"
     },
     view:(vnode)=>{
       return m("div[align='center']",m("button"+vnode.state.style,{onclick:()=>{NewGame = true}},"Reset"))
     },
     onupdate:(vnode)=>{
        m.redraw()
       if(Move > 8 || GameEnds == true){
           vnode.state.style = ""
       }else if(NewGame == null){
           vnode.state.style = "[disabled]"
       }
     }
   }
   
   
   const Home = {
     view: ()=>{
       return m("main", [
           m(Header),
           m(Main),
           m(Button)
       ])
     }
   }
   
   m.mount(document.getElementById('root'), Home)

})()