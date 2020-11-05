var x = 50;
var y = 0;
var width = parseFloat($('#player').css('width').split("p")[0]);
var height = parseFloat($('#player').css('height').split("p")[0]);
            
var xVel = 0;
var yVel = 0;
            
var gravity = 0.12;
var moveAccel = 0.2;
            
var maxSpeed = 2;
var maxVertSpeed = 7;
            
var jumpForce = 5;
        
var onGround = false;
var rightDown = false;
var leftDown = false;
var upKeyDown = false;
            
var collidables = $('.collidable');
            
update();
            
function update(){
                
    if (!playerCollidingAt(x, y + 1)) {
        if (yVel < maxVertSpeed) {
            yVel += gravity;
                        
            if (yVel > maxVertSpeed) {
                yVel = maxVertSpeed;
            }
        }
        else
        {
            yVel = maxVertSpeed;
        }
    }
    else
    {
        if (upKeyDown)
        {
            yVel = -jumpForce;
        }
    }
                
    if (rightDown == true)
    {
        if (xVel < maxSpeed)
        {
            xVel += moveAccel;
        }
        else
        {
            xVel = maxSpeed;
        }  
    }
    else if (leftDown == true)
    {
        if (xVel > -maxSpeed)
        {
            xVel -= moveAccel;
        }
        else
        {
            xVel = -maxSpeed;
        } 
    }
    else if (xVel != 0)
    {
        xVel *= 0.9;
    }
    
    // Collisions
    // Horizontal
    if (playerCollidingAt(x + xVel, y))
    {
        while (!playerCollidingAt(x + Math.sign(xVel), y)) {
            x += Math.sign(xVel);
        }
        
        xVel = 0.0;
    }
    else
    {
        x += xVel;
    }
    
    // Vertical
    if (playerCollidingAt(x, y + yVel))
    {
        while (!playerCollidingAt(x, y + Math.sign(yVel))) {
            y += Math.sign(yVel);
        }
        
        yVel = 0.0;
    }
    else
    {
        y += yVel;
    }
                
    // Apply position
    $('#player').css("left", x + "px");
    $('#player').css("top", y + "px");
                
    setTimeout(update, 10); // 1/10th of a sec
}
            
document.addEventListener('keydown', function(event) {
    // Left
    if(event.keyCode == 37) {
        leftDown = true;
    }
    // Right
    else if(event.keyCode == 39) {
        rightDown = true;
        console.log(Math.sign(xVel));
    }
    // Up - Jump
    else if(event.keyCode == 38) {
        upKeyDown = true;
    }
});
            
document.addEventListener('keyup', function(event) {
    // Left
    if(event.keyCode == 37) {
        leftDown = false;
    }
    // Right
    else if(event.keyCode == 39) {
        rightDown = false;
    }
    // Up - Jump
    else if(event.keyCode == 38) {
        upKeyDown = false;
    }
});
            
function playerCollidingAt(xPos, yPos) {
    var collision = false;
    
    $(collidables).each(function(){
        var wallX = parseFloat($(this).css('left').split("p")[0]);
        var wallWidth = parseFloat($(this).css('width').split("p")[0]);
                    
        var wallY = parseFloat($(this).css('top').split("p")[0]);
        var wallHeight = parseFloat($(this).css('height').split("p")[0]);
                    
        if (xPos + width > wallX && xPos < wallX + wallWidth)
        {
            if (yPos + height > wallY && yPos < wallY + wallHeight)
            {
                collision = true;
                return false; // Breaks from loop
            }
        }
    });
                
    return collision;
}