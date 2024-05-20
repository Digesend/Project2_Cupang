let currentIndex = 0;
const slides = document.querySelectorAll('.slider-wrapper img');    /*우선 const는 static과 비슷한 느낌, 나머지는 let으로 작성 */
const totalSlides = slides.length;
const sliderWrapper = document.querySelector('.slider-wrapper');
let slideInterval = setInterval(nextSlide, 3000); // 슬라이드 전환 간격 설정
let isPaused = false; // 슬라이드 멈춤 상태를 저장하는 변수

function showSlide(index) {
    if (index >= totalSlides) {
        sliderWrapper.style.transition = 'none';    // 슬라이드 전환 애니메이션을 비활성화
        currentIndex = 0;
        const offset = -currentIndex * 100; // 슬라이드 위치를 계산
        sliderWrapper.style.transform = `translateX(${offset}%)`;
        setTimeout(() => {
            sliderWrapper.style.transition = 'transform 0.5s ease'; // 슬라이드 전환 애니메이션을 다시 활성화
            currentIndex++;
            showSlide(currentIndex);
        }, 20); // 20밀리초 지연을 줘서 트랜지션이 적용되도록 함
        return;
    }

    if (index < 0) {    // 인덱스가 0보다 작은 경우 (이전 슬라이드를 누른 경우)
        sliderWrapper.style.transition = 'none';
        currentIndex = totalSlides - 2;
        const offset = -currentIndex * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
        setTimeout(() => {
            sliderWrapper.style.transition = 'transform 0.5s ease';
            currentIndex--;
            showSlide(currentIndex);
        }, 20); // 작은 지연을 줘서 트랜지션이 적용되도록 함
        return;
    }

    const offset = -index * 100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;
}


function nextSlide() {
    currentIndex++;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex--;
    showSlide(currentIndex);
}

function toggleSlide() {
    const pauseButton = document.querySelector('.pause');
    if (isPaused) {
        slideInterval = setInterval(nextSlide, 3000); // 슬라이드 전환 재개
        pauseButton.textContent = 'Pause'; // 버튼 텍스트를 "Pause"로 변경
    } else {
        clearInterval(slideInterval); // 슬라이드 전환 멈춤
        pauseButton.textContent = 'Play'; // 버튼 텍스트를 "Play"로 변경
    }
    isPaused = !isPaused; // 슬라이드 멈춤 상태를 반전
}

showSlide(currentIndex);
