<script>
  import { Container, Row, Col, Button } from "sveltestrap";

  let fr = new FileReader();

  let files;
  let bpm = 100.0;
  let resolution = 198;
  let fresolution = 472.44094488189;

  let ExpertChart;

  let chartData = [];

  let finishedChart = {
    song: {
      song: "Bopeebo",
      bpm: 100.0,
      needsVoices: true,
      player1: "bf",
      player2: "dad",
      speed: 1.3,
      notes: [],
    },
  };

  let processedFileText = "";

  fr.onload = function () {
    let result = fr.result;
    let resolutionIndex = result.indexOf("Resolution");
    let bpmIndex = result.indexOf("0 = B");

    let songName = cutString(result, result.indexOf("Name") + 8).substring(
      0,
      cutString(result, result.indexOf("Name") + 8).indexOf('"')
    );

    finishedChart.song.song = songName;

    if (bpmIndex != -1) {
      bpm = parseInt(result.substring(bpmIndex + 6)) / 1000.0;
    }

    finishedChart.song.bpm = bpm;

    if (resolutionIndex != -1) {
      resolution = parseInt(result.substring(resolutionIndex + 13));
    }

    ExpertChart = cutString(
      cutString(result, result.indexOf("[ExpertSingle]")),
      cutString(result, result.indexOf("[ExpertSingle]")).indexOf("{") + 2
    );

    populateChartData();
    let workingMaxValue = Math.ceil(chartData[chartData.length - 1][0] / (fresolution*4));
    console.log(chartData[chartData.length - 1]);
    for (let i = 0; i < workingMaxValue; i++) {
      finishedChart.song.notes[i] = {
        startTime: i * (fresolution*4),
        endTime: (i + 1) * (fresolution*4),
        lengthInSteps: 16,
        mustHitSection: true,
        sectionNotes: [],
      };
      for (let j = 0; j < chartData.length; j++) {
        console.log(chartData[j][0]);
        if (chartData[j][0] < (fresolution*4) * (i + 1)) {
          finishedChart.song.notes[i].sectionNotes.push(chartData[j]);
          chartData.splice(j, 1);
          j--;
        }
      }
    }
  };

  function populateChartData() {
    let notePos = (parseInt(ExpertChart) * fresolution) / resolution;
    ExpertChart = ExpertChart.substring(ExpertChart.indexOf("N") + 2);
    let noteType = parseInt(ExpertChart);
    if (noteType == 7) {
      noteType = 3;
    } else if (noteType == 4) {
      noteType = 0;
    }
    ExpertChart = ExpertChart.substring(2);
    let noteLength = (parseInt(ExpertChart) * fresolution) / resolution;
    ExpertChart = ExpertChart.substring(2);

    chartData.push([notePos, noteType, noteLength]);

    if (ExpertChart.indexOf("N") != -1) {
      populateChartData();
    }
  }

  function download() {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(finishedChart));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "chart.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function cutString(string, index) {
    return string.substring(index);
  }

  function processFile() {
    fr.readAsText(Array.from(files)[0]);
  }
</script>

<div class="App">
  <!-- <header class="App-header">
    <p>
      Page has been open for <code>{count}</code>
      seconds.
    </p>
  </header> -->
  <Container>
    <Row class="my-2">
      <Col>
        <div class="d-flex justify-content-center">
          <Button primary on:click={() => processFile()}>Convert</Button>
          <Button primary on:click={() => download()}>Download!</Button>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div class="d-flex justify-content-center">
          <input type="file" bind:files />
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div class="d-flex justify-content-center">
          {processedFileText}
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        {#each Object.entries(chartData) as [pos, type]}
          {pos} {type}
        {/each}
      </Col>
    </Row>
  </Container>
</div>

<style>
</style>
