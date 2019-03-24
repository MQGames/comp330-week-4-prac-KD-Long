class Snake {

        // initialisation
        constructor (){
                this.position = [0,0]
                this.rotation = 0;
                this.speed = 0.01
        }

        //update the snake on each Frame
        update (deltaTime){
                check(isNumber(deltaTime))

                //this.rotation = this.rotation + deltaTime;
                //console.log("in snake valxxxx: "+ Input.leftPressed)
                //console.log("right: " + Input.rightPressed)

                // rotate the head
                if (Input.leftPressed) {
                    this.rotation = Math.PI;
                }
                else if (Input.rightPressed) {
                    this.rotation = 0;
                }
                else if (Input.upPressed) {
                    this.rotation = Math.PI/2;
                }
                else if (Input.downPressed) {
                    this.rotation = 3*Math.PI/2;
                }


                // move in the current direction
                this.position[0] += Math.cos(this.rotation) * this.speed * deltaTime;
                this.position[1] += Math.sin(this.rotation) * this.speed * deltaTime;

        }

        //draw snake

        render(gl, worldMatrixUniform,colourUniform){
                //check(isContext(gl),isUniformLocation(worldMatrixUniform))
                //console.log("main: "+ isContext(gl))
                //console.log("main: "+ isUniformLocation(worldMatrixUniform))

                // set the uniforms
                let matrix = Matrix.trs(this.position[0],this.position[1],this.rotation,1,1)
                Matrix.pp(matrix)

                gl.uniformMatrix3fv(worldMatrixUniform, false, matrix);
                //gl.colourUniform(colourUniform,)

                // draw the head Float32Array([0,-0.5, 0,0.5, 1,0]);
                const head = new Float32Array([0,-0.5,0,0.5,1,0])
                gl.bufferData(gl.ARRAY_BUFFER,head,gl.STATIC_DRAW)

                gl.drawArrays(gl.TRIANGLES, 0, head.length / 2);

        }


}
