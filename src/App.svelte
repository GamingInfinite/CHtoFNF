<script>
  import { Container, Row, Col, Button } from "sveltestrap";

  let fr = new FileReader();

  let files;
  let bpm = 100.0;
  let resolution = 198;
  let fresolution = 600;

  let ExpertChart;
  let BPMs;

  let chartData = [];
  let bpmData = [];

  let finishedChart = {
    song: {
      song: "Bopeebo",
      bpm: 100.0,
      needsVoices: false,
      player1: "bf",
      player2: "dad",
      speed: 1.3,
      notes: [],
      eventObjects: [],
    },
  };

  let processedFileText = "";

  let testFix = [];

  fr.onload = function () {
    let result = fr.result;
    let resolutionIndex = result.indexOf("Resolution");
    let bpmIndex = result.indexOf("0 = B");
    firstNote = Number.MAX_SAFE_INTEGER;

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

    BPMs = cutString(
      cutString(
        cutString(result, result.indexOf("[SyncTrack]")),
        cutString(result, result.indexOf("[SyncTrack]")).indexOf("{") + 2
      ),
      0,
      cutString(
        cutString(result, result.indexOf("[SyncTrack]")),
        cutString(result, result.indexOf("[SyncTrack]")).indexOf("{") + 2
      ).indexOf("}")
    );

    ExpertChart = cutString(
      cutString(
        cutString(result, result.indexOf("[ExpertSingle]")),
        cutString(result, result.indexOf("[ExpertSingle]")).indexOf("{") + 2
      ),
      0,
      cutString(
        cutString(result, result.indexOf("[ExpertSingle]")),
        cutString(result, result.indexOf("[ExpertSingle]")).indexOf("{") + 2
      ).indexOf("}")
    );

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
          for (let k = 0; k < bpmData.length; k++) {
            if (chartData[j][0] >= bpmData[k][0]) {
              bpm = bpmData[k][1];
            }
          }
          finishedChart.song.notes[i].sectionNotes.push(chartData[j]);
          chartData.splice(j, 1);
          j--;
        }
      }
    }
    for (let k = 0; k < bpmData.length; k++) {
      finishedChart.song.eventObjects[k] = {
        name: "BPM set " + k,
        position: bpmData[k][0],
        value: bpmData[k][1],
        type: "BPM Change",
      };
    }
    for (let j = 0; j < testFix.length; j++) {
      finishedChart.song.notes[0].sectionNotes.pop();
    }
  };

  // Jank Fix incoming, bear with me there's a weird thing where it fills the first note section with junk notes.  Trying to fix

  let firstNote = Number.MAX_SAFE_INTEGER;

  function populateBPMData() {
    let bpmChangePos = parseInt(BPMs);
    let bpmbruh = false;
    BPMs = BPMs.substring(BPMs.indexOf("=") + 2);

    switch (BPMs.substring(0, 1)) {
      case "T":
        bpmbruh = true;
        BPMs = BPMs.substring(2);
        console.log("Fuck this line, we don't need it.");
        break;
      case "B":
        console.log("Ok this is fine");
        BPMs = BPMs.substring(2);
        break;
      default:
        break;
    }

    let newBPM = parseInt(BPMs) / 1000;
    BPMs = BPMs.substring(2);
    bpmChangePos = bpmChangePos * (60 / newBPM / resolution) * 1000;
    if (!bpmbruh) {
      bpmData.push([bpmChangePos, newBPM]);
    } else {
      bpmbruh = false;
    }

    if (BPMs.indexOf("B") != -1) {
      populateBPMData();
    }
  }

  let funnyCount = 0;

  function populateChartData() {
    if (BPMs.indexOf("B") != -1) {
      populateBPMData();
    }

    let notePos = parseInt(ExpertChart) * (60 / bpm / resolution) * 1000;
    if (funnyCount == 0) {
      firstNote = notePos;
      funnyCount++;
      console.log(firstNote);
    }
    let bruh = false;

    if (notePos < firstNote) {
      testFix.push(parseInt(ExpertChart));
    }

    ExpertChart = ExpertChart.substring(ExpertChart.indexOf("=") + 2);

    switch (ExpertChart.substring(0, 1)) {
      case "S":
        bruh = true;
        ExpertChart = ExpertChart.substring(2);
        break;
      case "N":
        ExpertChart = ExpertChart.substring(2);
        break;
      // case "E":
      //   bruh = true;
      //   ExpertChart = ExpertChart.substring(2);
      //   break;
      default:
        console.log("Yeah this code sucks");
        break;
    }

    let noteType = parseInt(ExpertChart);
    if (noteType == 7) {
      noteType = 3;
    } else if (noteType == 4) {
      noteType = 0;
    }
    ExpertChart = ExpertChart.substring(2);

    let noteLength = parseInt(ExpertChart) * (60 / bpm / resolution) * 1000;
    ExpertChart = ExpertChart.substring(2);

    if (!(noteType == 6 || noteType == 5) && !bruh) {
      chartData.push([notePos, noteType, noteLength]);
    } else {
      bruh = false;
    }

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

  function cutString(string, index, endindex = 0) {
    if (endindex == 0) {
      return string.substring(index);
    } else {
      return string.substring(index, endindex);
    }
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
