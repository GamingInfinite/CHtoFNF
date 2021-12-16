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
      needsVoices: false,
      player1: "bf",
      player2: "dad",
      speed: 1.3,
      notes: [],
    },
  };

  let processedFileText = "";

  let testFix = [];

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
      cutString(
        cutString(result, result.indexOf("[ExpertSingle]")),
        cutString(result, result.indexOf("[ExpertSingle]")).indexOf("{") + 2
      ),
      cutString(
        cutString(result, result.indexOf("[ExpertSingle]")),
        cutString(result, result.indexOf("[ExpertSingle]")).indexOf("{") + 2
      ).indexOf("}")
    );

    calculateResolution(result);
    populateChartData();
    let workingMaxValue = Math.ceil(
      chartData[chartData.length - 1][0] / (fresolution * 4)
    );

    for (let i = 0; i < workingMaxValue; i++) {
      finishedChart.song.notes[i] = {
        startTime: i * (fresolution * 4),
        endTime: (i + 1) * (fresolution * 4),
        lengthInSteps: 16,
        mustHitSection: true,
        sectionNotes: [],
      };
      for (let j = 0; j < chartData.length; j++) {
        if (chartData[j][0] < fresolution * 4 * (i + 1)) {
          finishedChart.song.notes[i].sectionNotes.push(chartData[j]);
          chartData.splice(j, 1);
          j--;
        }
      }
    }
    for (let j = 0; j < testFix.length; j++) {
      finishedChart.song.notes[0].sectionNotes.pop();
    }
  };

  // Jank Fix incoming, bear with me there's a weird thing where it fills the first note section with junk notes.  Trying to fix

  function populateChartData() {
    let notePos = (parseInt(ExpertChart) * fresolution) / resolution;

    if (parseInt(ExpertChart) < resolution * 4 * 1) {
      testFix.push(parseInt(ExpertChart));
    }

    ExpertChart = ExpertChart.substring(ExpertChart.indexOf("=") + 2);

    switch (ExpertChart.substring(0, 1)) {
      case "S":
        ExpertChart = ExpertChart.substring(6);
        break;
      case "N":
        ExpertChart = ExpertChart.substring(2);
        break;
      default:
        break;
    }

    let noteType = parseInt(ExpertChart);
    if (noteType == 7) {
      noteType = 3;
    } else if (noteType == 4) {
      noteType = 0;
    }
    ExpertChart = ExpertChart.substring(2);

    let noteLength = (parseInt(ExpertChart) * fresolution) / resolution;
    ExpertChart = ExpertChart.substring(2);

    if (!(noteType == 6 || noteType == 5)) {
      chartData.push([notePos, noteType, noteLength]);
    }

    if (ExpertChart.indexOf("N") != -1) {
      populateChartData();
    }
  }

  function calculateResolution(chartFile) {
    
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
