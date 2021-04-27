class Log extends BaseClass{
  constructor(x,y,height,angle){
    super(x,y,20,height,angle);
    this.image = loadImage("sprites/wood2.png");
    //this.image = loadImage("sprites/Wood3.png");
    Matter.Body.setAngle(this.body, angle);
    this.Visiblity = 255
    
  }

  display(){
    //console.log(this.body.speed);
    
    if(this.body.speed < 4.5){
     super.display();
     if(this.body.speed > 4){
       this.image = loadImage("sprites/wood4.png");
     }
    }
    else{
      World.remove(world, this.body);
      push();
      this.Visiblity = this.Visiblity - 5;
      tint(255,this.Visiblity);
      image(this.image, this.body.position.x, this.body.position.y, 50, 50);
      pop();
    }
   }
}