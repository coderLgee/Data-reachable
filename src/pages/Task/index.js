import React, { memo, useRef, useState } from "react";
import { TaskWrapper } from "./style";

const Task = memo(() => {
  const [listIndex, setlistIndex] = useState(1);

  const taskRef = useRef();
  const addInput = useRef();
  const studyRef = useRef();
  const learningRef = useRef();
  const completeRef = useRef();

  //添加input框
  const createElement = () => {
    //创建input元素(在input前创建一个空的div站位)
    const newInput = document.createElement("input");
    const blank = document.createElement("div");
    blank.className = "blank";
    addInput.current.before(newInput);
    newInput.before(blank);
  };

  const moveElement = (element) => {
    const newInput = document.createElement("input");
    element.current.appendChild(newInput);
  };

  // 添加新的study
  const add = () => {
    createElement();
    //给增加的input增加监听事件
    console.log(completeRef);
    const currentInput = studyRef.current.childNodes[listIndex];
    let diffX; //与外层的距离（input）
    let diffY;
    let currentX; //input框原始的位置
    let currentY;
    let mouseX; //鼠标的位置
    let mouseY;
    let taskX;
    let taskY;
    //move监听函数
    const moveFn = (e) => {
      //设置拖动时的位置(还要减去margin的偏移量)
      currentInput.style.left = e.clientX - 20 - diffX + "px";
      currentInput.style.top = e.clientY - diffY + "px";
      mouseX = e.clientX;
      mouseY = e.clientY;

      //当鼠标进入学习或完成框中，边框发生变化
      taskX = taskRef.current.offsetLeft;
      taskY = taskRef.current.offsetTop;
      if (
        mouseX > taskX - 100 &&
        mouseX < taskX + 100 &&
        mouseY < taskY + learningRef.current.scrollHeight / 2 &&
        mouseY > taskY - learningRef.current.scrollHeight / 2
      ) {
        // 改变边框
        learningRef.current.style.border = "2px solid #85eaff";
      } else {
        learningRef.current.style.border = "";
      }
      if (
        mouseX > taskX - 100 + learningRef.current.scrollWidth &&
        mouseX < taskX + 100 + learningRef.current.scrollWidth &&
        mouseY < taskY + completeRef.current.scrollHeight / 2 &&
        mouseY > taskY - completeRef.current.scrollHeight / 2
      ) {
        // 改变边框
        completeRef.current.style.border = "2px solid #74787c";
      } else {
        completeRef.current.style.border = "";
      }

      console.log(taskRef);

      // console.log(mouseX, mouseY);
    };
    //添加监听器
    currentInput.addEventListener(
      "mousedown",
      (e) => {
        //按住

        currentInput.style.position = "absolute";

        diffX = e.clientX - currentInput.offsetLeft;
        diffY = e.clientY - currentInput.offsetTop;
        currentX = currentInput.style.left;
        currentY = currentInput.style.top;

        //moving
        currentInput.addEventListener("mousemove", moveFn);
      },
      false
    );

    currentInput.addEventListener("mouseup", () => {
      //松开的逻辑
      if (
        mouseX > taskX - 100 &&
        mouseX < taskX + 100 &&
        mouseY < taskY + learningRef.current.scrollHeight / 2 &&
        mouseY > taskY - learningRef.current.scrollHeight / 2
      ) {
        moveElement(learningRef);
        //销毁原来的input
      }
      if (
        mouseX > taskX - 100 + learningRef.current.scrollWidth &&
        mouseX < taskX + 100 + learningRef.current.scrollWidth &&
        mouseY < taskY + completeRef.current.scrollHeight / 2 &&
        mouseY > taskY - completeRef.current.scrollHeight / 2
      ) {
        moveElement(completeRef);
      }

      currentInput.style.position = "";
      currentInput.style.left = currentX;
      currentInput.style.top = currentY;

      currentInput.removeEventListener("mousemove", moveFn);
    });
    setlistIndex(listIndex + 2);
  };

  return (
    <TaskWrapper ref={taskRef}>
      <div className="study" ref={studyRef}>
        <div className="add" ref={addInput} onClick={add}>
          +
        </div>
      </div>
      <div className="learning" ref={learningRef}></div>
      <div className="complete" ref={completeRef}></div>
    </TaskWrapper>
  );
});

export default Task;
