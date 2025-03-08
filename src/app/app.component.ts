import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopUpComponent } from './pop-up/pop-up.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, PopUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  num = 0;
  positionX = 55; // Vị trí ban đầu (trái)
  positionY = 92.3; // Vị trí ban đầu (trên)
  maxWidth = 40; // Chiều rộng tối đa vùng random
  maxHeight = 90; // Chiều cao tối đa vùng random
  popups: { id: number; x: number; y: number }[] = []; // Mảng chứa danh sách popup
  popupCount = 300; // Số lượng popups cần tạo
  currentIndex = 0; // Đếm số popup đã hiển thị
  changeText = 'Không';

  texts = [
    'Nếu em nói không anh buồn lắm :((',
    'Em suy nghĩ lại đi',
    "Ấn có đi bạn nhỏ ơi! 🥺",
    "Thôi màaaa, đừng dỗi nữa nhaa 😘",
    "Anh biết anh sai rồi, đừng giận nữa mà...",
    "Em dễ thương vậy mà nỡ nói không à? 🥺",
    'Anh có thể làm vầy cả đêm luôn á 🥺',
  ];

  changeTextButton() {
    if (this.num < this.texts.length) {
      this.changeText = this.texts[this.num];
      this.num++;
    } else {
      this.changeText = 'Không';
      this.num = 0;
    }
    this.moveButton(); 
  }

  moveButton() {
    this.positionX = 40 + Math.random() * (60 - 40);
    this.positionY = 60 + Math.random() * (90 - 60);
  }

  sheSayYes() {
    const maxWidth = window.innerWidth; // Giới hạn chiều ngang
    const maxHeight = window.innerHeight; // Giới hạn chiều dọc
    let tempPopups = []; // Mảng tạm để lưu pop-ups trước khi hiển thị

    // Tạo trước danh sách popups nhưng chưa hiển thị ngay
    for (let i = 0; i < this.popupCount; i++) {
      tempPopups.push({
        id: i,
        x: Math.random() * maxWidth, // Random vị trí X
        y: Math.random() * maxHeight, // Random vị trí Y
      });
    }

    // Hiển thị từng pop-up mỗi 0.3s
    const interval = setInterval(() => {
      if (this.currentIndex < tempPopups.length) {
        this.popups.push(tempPopups[this.currentIndex]); // Thêm từng popup vào danh sách hiển thị
        this.currentIndex++;
      } else {
        clearInterval(interval); // Dừng khi đã hiển thị hết
      }
    }, 100);
  }
}