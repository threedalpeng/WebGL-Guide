# 물체를 움직여보자

- 목차

# 지난 시간까지는...

처음으로 WebGL을 사용하여 렌더링을 해보았습니다. 물체가 렌더링될 수 있도록 저희는 정점의 위치와 색 정보가 담긴 배열을 버퍼에 담아 GPU로 보냈고, GPU 안에서 해당 정보를 처리할 수 있도록 쉐이더를 구현하였습니다.

이 과정에서, 저희는 쉐이더 안에 스크린을 기준으로 정한 위치 좌표를 클립스페이스로 변환해주는 작업을 수행했습니다. 간단한 계산을 통해 캔버스 크기의 특정 좌표로 입력해준 정점의 위치를 2D 상의 [-1, 1]의 범위 안에 재배치해주었습니다. 사실상 우리는 우리의 입맛에 맞게 (어쩌면 OpenGL의 입맛에 맞게) 좌표를 변환하는 데에 성공한 것입니다.

문득 여러분은 여러분이 그려준 삼각형과 동그라미, 또는 무언가가 화면 속을 이리저리 움직이는 모습을 싶어졌습니다. 어떻게 해야 할지 감이 오시나요? 여러분이 전달한 정점의 위치 정보를 바꿔준 후 화면을 다시 그려주면, 물체가 순간 이동한 것처럼 보일 겁니다.

[week2-v0.webm](%E1%84%86%E1%85%AE%E1%86%AF%E1%84%8E%E1%85%A6%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%AE%E1%86%B7%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%A7%E1%84%87%E1%85%A9%E1%84%8C%E1%85%A1%2026cd2cac98d8478598ab8d026817d91e/week2-v0.webm)

하지만 물체가 회전하기를 원하거나, 물체의 크기를 키우려고 하면 상황이 조금 더 복잡할 수 있습니다. 단순히 좌표값을 더한다고 해결되는 문제가 아니기 때문이죠. x, y (또는 z) 좌표 각각에 대해 어떻게든 원하는 수식을 찾아냈다고 하더라도 문제는 사라지지 않습니다. 만약 여러 변환을 동시에 수행해야 하거나, 여러 물체가 있다고 생각해보세요. 저희에게는 더욱 일반적이고 효율적인 방법이 필요합니다.

여기서 선형대수학은 행렬이라는 도구를 통해 매우 간단한 해답을 제시합니다. 좌표 변환을 행렬곱이라는 연산 하나로 처리합니다. 좌표에 행렬을 곱하면 새로운 좌표가 나오는 식입니다. 이를 통해 뭋체를 이동, 회전시키거나 크기를 조절할 수도 있습니다. 또한 앞서 저희가 클립스페이스로 좌표를 변환해준 것처럼 공간을 바라보는 기준에 맞게 공간 전체 좌표를 바꾸어버릴 수도 있습니다. (앞의 설명이 정확하진 않지만, 이러한 개념은 나중에 카메라로 물체를 바라볼 때 유용하게 사용됩니다!)

물체를 변환하는 법을 알았지만, 이내 무언가 부족함을 느끼실 겁니다. 딱딱하게 끊기듯 전환되는 이미지로도 물체가 이동한 것은 이해할 수는 있지만 그 움직임은 어색합니다. 반면 저희가 일반적으로 보는 컴퓨터 속 그래픽은 시간에 따라 매우 자연스러운 애니메이션을 보여줍니다.

움직임을 우리 눈 앞에 어색함 없이 보여주는 것은 아주 오래전, 비디오 게임의 초창기부터, 어쩌면 카메라와 영사기가 발명되었을 때부터 중요한 문제였을 겁니다. 정지된 사진이 필름을 통해 순차적으로 영사기에 들어가며 스크린에 비추어집니다. 놀랍게도 저희는 그 사진들을 자연스럽게 이어지는 동영상으로 인식합니다. 왜냐하면 눈을 속일 정도의 짧은 시간 동안 보고 있던 사진이 새로이 교체되며, 딱 그 사이의 시간만큼 사진이 변화했기 때문입니다.

실시간으로 입력을 받아 화면을 새롭게 그려야 하는 게임 프로그래머들에게는 이를 구현하는 것이 하나의 커다란 숙제였을 겁니다. 이내 그 방법은 다양한 시도를 거치며 나름의 정형화된 패턴을 가지게 되었고, ‘게임 루프’라는 익숙한 명칭이 생겼습니다. 부드러운 움직임을 표현하기 위한 아주 중요한 방법이지만 하는 일은 간단합니다. 시간에 맞춰 정보를 업데이트 한 후 그려주는 것을 계속해서 반복하는 것입니다. 물론 실제 게임에서는 들어오는 입력도 처리해 주며 다양한 작업을 수행해야겠지만, 부드러운 애니메이션은 저 과정만으로 충분히 가능합니다.

결국, 이번 주차의 목표를 간단히 정리하자면 다음과 같습니다.

- 행렬 계산을 통한 2D 좌표 변환(이동, 회전, 크기 조절 등)
- 애니메이션과 게임 루프 기초: 시간을 활용해 화면을 새롭게 그리기

# 시작하기 전에

이번 파트는 행렬을 사용하기에 약간의 선형대수학 지식이 필요합니다.

3blue1brown 채널의 선형대수학 시리즈입니다. 매우 직관적으로 선형대수학을 이해할 수 있어 처음 선형대수학을 접하는 분들께 추천합니다. 이미 선형대수학을 배우신 분들도 다시금 짚어보기에 좋은 자료입니다.

[Essence of linear algebra](https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)

약간의 개념 이해만으로도 진행에는 부족하지 않으니 한번 시청하고 오시길 바랍니다.

# 2D 변환과 행렬

이번에도 역시 webgl2fundamentals를 활용합니다.

[WebGL2 Fundamentals](https://webgl2fundamentals.org/)

**2D translation, rotation, scale, matrix math** 부분을 따라하며 실습하면 되겠습니다.

### OpenGL의 Matrix는 무언가 이상하다?

선형대수학 개념이 명확히 잡혀있는 사람이라면 위 웹페이지의 [2D Matrices](https://webgl2fundamentals.org/webgl/lessons/webgl-2d-matrices.html)에 소개된 행렬 계산이 많이 이상하다는 것을 느끼실 수 있습니다. 예를 들어, translation을 위한 행렬은 다음과 같습니다.

![Untitled](%E1%84%86%E1%85%AE%E1%86%AF%E1%84%8E%E1%85%A6%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%AE%E1%86%B7%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%A7%E1%84%87%E1%85%A9%E1%84%8C%E1%85%A1%2026cd2cac98d8478598ab8d026817d91e/Untitled.png)

예시를 보면 행렬을 저런 형태로 만들어 쉐이더로 전달해줍니다. 이를 활용해 좌표 변환을 다음과 같이 수행합니다.

```c
translatedPosition = translationMatrix * position;
```

직접 머리와 펜을 활용해 계산해보시면 아시겠지만 이 계산은 원하는 결과를 주지 않습니다. 이유를 설명하자면, 저 행렬은 row-major order를 위한 레이아웃이며, 실제 계산은 column-major order로 이루어지고 있기 때문입니다. 수학적으로 올바른 계산을 위해서는 다음과 같이 벡터와 행렬의 순서가 수정되어야 합니다.

```c
translatedPosition = position * translationMatrix;
```

그럼 webgl2fundamentals 저자가 수학적 지식이 부족한걸까요? 아닙니다. 실제로 OpenGL 프로그램에서 행렬은 메모리 안에 저렇게 표현되어야 합니다. OpenGL 뿐만이 아니라 다른 저수준 그래픽 API들도 행렬을 저렇게 표현하고 있습니다.

[WebGL2 Matrices vs Math Matrices](https://webgl2fundamentals.org/webgl/lessons/webgl-matrix-vs-math.html)

webgl2fundamentals의 저자도 이 문제에 대해 설명해놓았습니다. 요약하자면, 연산의 효율성이 근본적인 이유입니다. 연산에 필요한 부분들이 메모리 상에서 붙어있어야 데이터를 가져올 때 훨씬 효율적이기 때문이죠. 그럼에도 GLSL에서는 column-major order로 계산을 하고 있습니다. 저자도 마지막에 이 부분에 대한 설명을 어떻게 해야할지 모르겠다며 체념하듯이 말합니다.

많은 OpenGL 입문자들에게 혼란을 가져온 이 문제에 대해 stackoverflow의 한 대답이 이렇게 된 이유를 설명해주고 있습니다.

[Confusion between C++ and OpenGL matrix order (row-major vs column-major)](https://stackoverflow.com/questions/17717600/confusion-between-c-and-opengl-matrix-order-row-major-vs-column-major)

결과적으로 column-major order로 행렬을 계산하던 것이 OpenGL의 컨벤션이었기 때문입니다.

개인적으로 여러분께 추천드리는 것은, 수학적인 엄밀함은 잠깐 옆에 둔 후, 메모리 레이아웃과 계산 방식을 분리한 다음 이러한 계산 방식을 **프로그래밍을 위한 하나의 API**로 취급하는 것입니다. 실제로 자바스크립트의 많은 행렬 계산 라이브러리에서 이런 모순을 제껴두고 API의 통일성을 위해 계산 순서는 column-major로, 메모리 레이아웃은 row-major로 나타냅니다.

실제로 행렬을 표현하고 계산하는 방식은 API와 프로그램에 따라 다를 수 있습니다. 이 문제에 대해서 또는 컴퓨터 그래픽스에서의 행렬 계산 순서에 대해 자세히 탐구하고 싶으면 아래 페이지를 참고해주세요.

[Geometry (Row Major vs Column Major Vector)](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/row-major-vs-column-major-vector)

# 게임 루프

본 설명에 아래 포스트를 적극적으로 참고하였고, 여러 게임 루프 방식과 그 차이에 대해 자세하게 서술된 글이니 꼭 읽어보십시오. 먼저 읽으셔도, 나중에 읽으셔도 상관없습니다.

[Game Loop](https://gameprogrammingpatterns.com/game-loop.html)

또한 브라우저에서의 애니메이션 루프 구현에 대해 webgl2fundamentals에서 서술한 자료가 있습니다.

[WebGL2 - Animation](https://webgl2fundamentals.org/webgl/lessons/webgl-animation.html)

## 자바스크립트에서의 게임 루프

다시금 얘기하자면, 부드러운 애니메이션을 위해 필요한 과정은 간단합니다. 업데이트, 그리고 렌더링.

```jsx
while (true) {
  update()
  render()
}
```

위 코드의 문제는 시간이 얼마나 지나갔는지 신경쓰지 않는다는 점입니다. 렌더링은 그 결과가 시간과 큰 관계가 없지만, 업데이트는 아닙니다. 만약 누군가가 사용하는 컴퓨터의 성능이 여러분의 것보다 월등히 좋아 업데이트 과정이 5배 빠르게 완료된다고 생각해봅시다. 분명 그 화면에는 어플리케이션이 여러분이 의도한 것의 5배속으로 돌아가고 있을 겁니다. 만약 여러분의 어플리케이션이 게임이었다면 난이도나 경험이 달라지는 큰 문제가 발생합니다.

이를 해결할 방법이 떠오르시나요? 만약 우리가 직접 업데이트 간격을 정해주면 어떨까요? 자바스크립트에서는 setTimeout 함수를 통해 원하는 함수를 원하는 시간 이후에 실행시켜 줄 수 있습니다. 참고로, 브라우저에서 가장 높은 정밀도로 현재 시간을 불러오는 방법은 `performance.now()`입니다.

```jsx
// 1초당 60프레임을 원한다고 가정하자
const FPS = 60
const MS_PER_FRAME = 1000 / FPS

const loop = async () => {
  const start = performance.now()

  await update()
  await render()

  const time_passed = performance.now() - time_passed

  // 남은 시간만큼 기다려준다.
  setTimeout(loop, MS_PER_FRAME - time_passed < 0 ? 0 : MS_PER_FRAME - time_passed)
}

loop()
```

하지만 이 코드도 문제가 있습니다. 만약 업데이트와 렌더링을 수행하는 과정이 생각보다 길어진다면, 그만큼 나타나는 화면이 지연될 겁니다. 이때 업데이트 자체가 늦어지는 상황이기에 화면은 저배속으로 진행되는 것처럼 보이겠죠. 우리의 어플리케이션은 딜레이가 생기더라도 시간에 맞게 화면이 나와야 합니다.

이번에는 이전에 지연된 시간을 포함하여, 이전 프레임 이후 지난 시간만큼 각 업데이트를 수행해봅시다. 이렇게 하면 이전 업데이트에 얼마나 많은 시간이 지났는지와 상관없이 현실의 시간과 같은 속도로 우리의 어플리케이션이 동작할 것입니다. 여기서 주의할 점은 이제 업데이트 시 매번 지나간 시간에 대한 정보가 필요합니다.

```jsx
let lastTime = performance.now()
while (true) {
  let current = performance.now()
  let elapsed = current - lastTime

  update(elapsed)
  render()

  lastTime = current
}
```

이제 분명 컴퓨터의 성능에 상관없이 시간 간격대로 업데이트와 렌더링을 수행해주는 코드가 완성된 것처럼 보입니다. 만약 이것이 다른 환경에서 작동하는 프로그램이었다면 그랬을 겁니다. WebGL은 자바스크립트 언어를 통해 브라우저에서 작동합니다. 브라우저 환경에서 무언가를 화면에 그려주는 작업은 전부 브라우저가 전담합니다. 즉, 브라우저가 원하는 타이밍에 화면이 다시 그려지며, 저희가 원하는 때에 바로바로 렌더링할 수 없습니다. 무엇보다도 setTimeout과 setInterval은 입력해준 시간을 보장하지 않습니다! 이 말은 곧 프로그래머가 원하는 속도로 애니메이션이 동작하지 않을 수 있다는 의미입니다. 결국 렌더링 타이밍은 브라우저가 정한 그대로 따르는 게 좋습니다.

그래서 자바스크립트에서는 브라우저에게 화면을 그리기 전에 수행해야 할 작업을 알려주는 함수인 `requestAnimationFrame(callback)`을 제공합니다.

```tsx
function requestAnimationFrame(callback: (t: DOMHighResTimeStamp) => void)
```

`requestAnimationFrame`은 callback에 함수 시작 시점을 파라미터를 통해 밀리초 단위로 알려줍니다. 실제 정밀도는 소수점을 통해 마이크로초 단위까지 얻을 수 있습니다. 이제 이 함수를 활용하여 이전 코드를 수정해주겠습니다.

```jsx
let lastTime = performance.now()
const loop = async (current) => {
  let elapsed = current - lastTime

  await update(elapsed)
  await render()

  lastTime = current

  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)
```

이제 브라우저에서 실제 쓸만한 수준의 게임루프가 완성되었습니다. 실제 그래픽 스터디를 위한 게임 루프로는 아주 충분합니다. 이미 위에 소개한 게임 루프 포스트를 보셨다면 이 루프 또한 해결해야 할 문제가 존재함을 아실겁니다. 안정적인 어플리케이션을 위해 고정적인 시간 간격으로 업데이트 해주어야하는 부분이 존재하게 때문입니다. 대표적으로 물리 관련 작업이 그러하며, 이 때문에 Unity 게임 엔진에서는 `Update`와 `FixedUpdate`를 구분합니다. 이 부분에 대한 자세한 설명과 해결 방법은 스스로 게임 루프 포스트를 읽으면서 확인해보신 후 직접 구현해보시면 좋겠습니다.

# 추가: 캔버스 녹화하기

제가 이번 주차를 준비하면서 물체가 움직이는 모습을 촬영해야 했습니다. 시중에 널려있는 GIF로 화면을 녹화해주는 프로그램을 사용하려다 품질이 좋지 않아 페이지 상에서 캔버스 자체를 녹화하는 방법을 찾아냈습니다.

`MediaRecorder` API와 `HTMLCanvasElement`의 `captureStream` 메소드를 사용하면 캔버스의 이미지들을 하나의 동영상으로 만들 수 있습니다. 아래 간단한 예시 코드를 제공합니다. 코드는 TypeScript지만 여러 타입 관련 부분들만 (예를 들어, `let variable: Type`) 무시하고 사용 방법만 보시면 되겠습니다.

- 예시 코드 보기
  ```html
  <body>
    <canvas id="app" width="720" height="720"></canvas>
    <div>
      <button id="btn-record-start">Start</button>
      <button id="btn-record-stop">Stop</button>
      <button id="btn-record-download">Download</button>
    </div>
  </body>
  ```
  ```tsx
  /* Recorder Handling */

  const canvas: HTMLCanvasElement = document.querySelector("canvas#app")!
  const stream = canvas.captureStream()

  let recordedChunks: BlobPart[] = []
  const recorder = new MediaRecorder(stream, {
    mimeType: "video/webm; codecs=vp9",
  })

  // 쌓인 데이터를 recordedChunks 배열에 저장해둡니다.
  recorder.ondataavailable = (e) => {
    recordedChunks.push(e.data)
  }

  const btnStart: HTMLButtonElement = document.querySelector("#btn-record-start")!
  btnStart.onclick = (e) => {
    // 리코더를 시작해주고 데이터 저장을 위한 배열을 비워줍니다.
    if (recorder.state !== "recording") {
      recorder.start()
      recordedChunks = []
    }
  }

  const btnStop: HTMLButtonElement = document.querySelector("#btn-record-stop")!
  btnStop.onclick = (e) => {
    // 리코더를 멈춥니다.
    if (recorder.state === "recording") {
      recorder.stop()
    }
  }

  const btnDownload: HTMLButtonElement = document.querySelector("#btn-record-download")!
  btnDownload.onclick = (e) => {
    if (recorder.state === "inactive") {
      // recordedChunks에 저장된 데이터를 webm 형식의 Blob으로 만들어줍니다.
      const blob = new Blob(recordedChunks, { type: "video/webm" })
      // Blob에 접근할 수 있는 URL을 만들어줍니다.
      const exportUrl = URL.createObjectURL(blob)

      // 파일이 자동으로 유저에게 다운로드되도록 많이들 쓰는 방식입니다.
      const link = document.createElement("a")
      document.body.appendChild(link)
      link.href = exportUrl
      link.download = "captured.webm"
      link.click()

      window.URL.revokeObjectURL(exportUrl)
      link.remove()
    }
  }
  ```

# 과제

삼각형이든 원이든 아무 물체나 상관없습니다. 왜냐하면 물체를 변환하는 것 자체가 중요하니까요! 물체가 어떻게 움직일지는 여러분의 자유입니다.

## Level 1-1: Translation - 물체를 이동시켜보자

물체의 위치를 옮겨봅시다. 저는 간단하게 원을 따라 돌도록 해보았습니다

[week2-a0.webm](%E1%84%86%E1%85%AE%E1%86%AF%E1%84%8E%E1%85%A6%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%AE%E1%86%B7%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%A7%E1%84%87%E1%85%A9%E1%84%8C%E1%85%A1%2026cd2cac98d8478598ab8d026817d91e/week2-a0.webm)

## Level 1-2: Rotation - 물체를 회전시켜보자

물체를 빙글빙글 돌려봅시다.

[week2-a0.webm](%E1%84%86%E1%85%AE%E1%86%AF%E1%84%8E%E1%85%A6%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%AE%E1%86%B7%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%A7%E1%84%87%E1%85%A9%E1%84%8C%E1%85%A1%2026cd2cac98d8478598ab8d026817d91e/week2-a0%201.webm)

## Level 1-3: Scale - 물체의 크기를 조절해보자

물체가 커졌다 작아졌다 들쭉날쭉하게 변하도록 만듭시다.

[week2-a2.webm](%E1%84%86%E1%85%AE%E1%86%AF%E1%84%8E%E1%85%A6%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%AE%E1%86%B7%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%A7%E1%84%87%E1%85%A9%E1%84%8C%E1%85%A1%2026cd2cac98d8478598ab8d026817d91e/week2-a2.webm)

## Level 2: 모두 한꺼번에!

원하는 결과를 위해 변환 순서를 잘 생각해봅시다.

[week2-a3.webm](%E1%84%86%E1%85%AE%E1%86%AF%E1%84%8E%E1%85%A6%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%AE%E1%86%B7%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%A7%E1%84%87%E1%85%A9%E1%84%8C%E1%85%A1%2026cd2cac98d8478598ab8d026817d91e/week2-a3.webm)
