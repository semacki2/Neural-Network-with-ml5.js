let nn;
let targetLabel = "A";

let pCurrentLabel;

function setup() {
  createCanvas(640, 480);

  background(222);

  let options = {
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: "true",
  };

  nn = ml5.neuralNetwork(options);

  let pInstructions = createP(
    "Click in the canvas to place a label. </br>Press a letter key on your keyboard to change the label. </br>Press the reset button to clear the values. </br>Press the train button to train the model. </br>The model learns hows x/y coordinates relate to label values."
  );

  pCurrentLabel = createP("Current Label: " + targetLabel);

  let btnReset = createButton("Reset");
  btnReset.mousePressed(resetModel);

  createP();
  
  let btnTrain = createButton("Train");
  btnTrain.mousePressed(trainModel);
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY,
  };

  let target = {
    label: targetLabel,
  };

  nn.addData(inputs, target);

  stroke(0);
  noFill();
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(targetLabel, mouseX, mouseY);
}

function keyPressed() {
  if (key === "t") {
    print("staring training");
    nn.normalizeData();
    let options = {
      epochs: 200,
      shuffle: true,
    };
    nn.train(options, whileTraining, finishedTraining);
  } else {
    targetLabel = key.toUpperCase();
    pCurrentLabel.html("Current Label: " + targetLabel);
  }
}

function whileTraining(epoch, loss) {
  print(epoch);
}

function finishedTraining() {
  print("finished training");
}

function resetModel() {
  background(222);

  let options = {
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: "true",
  };

  nn = ml5.neuralNetwork(options);
}

function trainModel() {
  print("staring training");
  nn.normalizeData();
  let options = {
    epochs: 200,
    shuffle: true,
  };
  nn.train(options, whileTraining, finishedTraining);
}
