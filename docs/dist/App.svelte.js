/* src/App.svelte generated by Svelte v3.44.2 */
import {
	SvelteComponent,
	append,
	attr,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	empty,
	init,
	insert,
	listen,
	mount_component,
	noop,
	safe_not_equal,
	space,
	text,
	transition_in,
	transition_out
} from "../snowpack/pkg/svelte/internal.js";

import { Container, Row, Col, Button } from "../snowpack/pkg/sveltestrap.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i][0];
	child_ctx[20] = list[i][1];
	return child_ctx;
}

// (253:10) <Button primary on:click={() => processFile()}>
function create_default_slot_10(ctx) {
	let t;

	return {
		c() {
			t = text("Convert");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (254:10) <Button primary on:click={() => download()}>
function create_default_slot_9(ctx) {
	let t;

	return {
		c() {
			t = text("Download!");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (251:6) <Col>
function create_default_slot_8(ctx) {
	let div;
	let button0;
	let t;
	let button1;
	let current;

	button0 = new Button({
			props: {
				primary: true,
				$$slots: { default: [create_default_slot_10] },
				$$scope: { ctx }
			}
		});

	button0.$on("click", /*click_handler*/ ctx[4]);

	button1 = new Button({
			props: {
				primary: true,
				$$slots: { default: [create_default_slot_9] },
				$$scope: { ctx }
			}
		});

	button1.$on("click", /*click_handler_1*/ ctx[5]);

	return {
		c() {
			div = element("div");
			create_component(button0.$$.fragment);
			t = space();
			create_component(button1.$$.fragment);
			attr(div, "class", "d-flex justify-content-center");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(button0, div, null);
			append(div, t);
			mount_component(button1, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const button0_changes = {};

			if (dirty & /*$$scope*/ 8388608) {
				button0_changes.$$scope = { dirty, ctx };
			}

			button0.$set(button0_changes);
			const button1_changes = {};

			if (dirty & /*$$scope*/ 8388608) {
				button1_changes.$$scope = { dirty, ctx };
			}

			button1.$set(button1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(button0);
			destroy_component(button1);
		}
	};
}

// (250:4) <Row class="my-2">
function create_default_slot_7(ctx) {
	let col;
	let current;

	col = new Col({
			props: {
				$$slots: { default: [create_default_slot_8] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(col.$$.fragment);
		},
		m(target, anchor) {
			mount_component(col, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const col_changes = {};

			if (dirty & /*$$scope*/ 8388608) {
				col_changes.$$scope = { dirty, ctx };
			}

			col.$set(col_changes);
		},
		i(local) {
			if (current) return;
			transition_in(col.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(col.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(col, detaching);
		}
	};
}

// (259:6) <Col>
function create_default_slot_6(ctx) {
	let div;
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input = element("input");
			attr(input, "type", "file");
			attr(div, "class", "d-flex justify-content-center");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);

			if (!mounted) {
				dispose = listen(input, "change", /*input_change_handler*/ ctx[6]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (258:4) <Row>
function create_default_slot_5(ctx) {
	let col;
	let current;

	col = new Col({
			props: {
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(col.$$.fragment);
		},
		m(target, anchor) {
			mount_component(col, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const col_changes = {};

			if (dirty & /*$$scope, files*/ 8388609) {
				col_changes.$$scope = { dirty, ctx };
			}

			col.$set(col_changes);
		},
		i(local) {
			if (current) return;
			transition_in(col.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(col.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(col, detaching);
		}
	};
}

// (266:6) <Col>
function create_default_slot_4(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = `${processedFileText}`;
			attr(div, "class", "d-flex justify-content-center");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (265:4) <Row>
function create_default_slot_3(ctx) {
	let col;
	let current;

	col = new Col({
			props: {
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(col.$$.fragment);
		},
		m(target, anchor) {
			mount_component(col, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const col_changes = {};

			if (dirty & /*$$scope*/ 8388608) {
				col_changes.$$scope = { dirty, ctx };
			}

			col.$set(col_changes);
		},
		i(local) {
			if (current) return;
			transition_in(col.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(col.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(col, detaching);
		}
	};
}

// (274:8) {#each Object.entries(chartData) as [pos, type]}
function create_each_block(ctx) {
	let t0_value = /*pos*/ ctx[19] + "";
	let t0;
	let t1;
	let t2_value = /*type*/ ctx[20] + "";
	let t2;

	return {
		c() {
			t0 = text(t0_value);
			t1 = space();
			t2 = text(t2_value);
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, t1, anchor);
			insert(target, t2, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(t1);
			if (detaching) detach(t2);
		}
	};
}

// (273:6) <Col>
function create_default_slot_2(ctx) {
	let each_1_anchor;
	let each_value = Object.entries(/*chartData*/ ctx[1]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*Object, chartData*/ 2) {
				each_value = Object.entries(/*chartData*/ ctx[1]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (272:4) <Row>
function create_default_slot_1(ctx) {
	let col;
	let current;

	col = new Col({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(col.$$.fragment);
		},
		m(target, anchor) {
			mount_component(col, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const col_changes = {};

			if (dirty & /*$$scope*/ 8388608) {
				col_changes.$$scope = { dirty, ctx };
			}

			col.$set(col_changes);
		},
		i(local) {
			if (current) return;
			transition_in(col.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(col.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(col, detaching);
		}
	};
}

// (249:2) <Container>
function create_default_slot(ctx) {
	let row0;
	let t0;
	let row1;
	let t1;
	let row2;
	let t2;
	let row3;
	let current;

	row0 = new Row({
			props: {
				class: "my-2",
				$$slots: { default: [create_default_slot_7] },
				$$scope: { ctx }
			}
		});

	row1 = new Row({
			props: {
				$$slots: { default: [create_default_slot_5] },
				$$scope: { ctx }
			}
		});

	row2 = new Row({
			props: {
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	row3 = new Row({
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(row0.$$.fragment);
			t0 = space();
			create_component(row1.$$.fragment);
			t1 = space();
			create_component(row2.$$.fragment);
			t2 = space();
			create_component(row3.$$.fragment);
		},
		m(target, anchor) {
			mount_component(row0, target, anchor);
			insert(target, t0, anchor);
			mount_component(row1, target, anchor);
			insert(target, t1, anchor);
			mount_component(row2, target, anchor);
			insert(target, t2, anchor);
			mount_component(row3, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const row0_changes = {};

			if (dirty & /*$$scope*/ 8388608) {
				row0_changes.$$scope = { dirty, ctx };
			}

			row0.$set(row0_changes);
			const row1_changes = {};

			if (dirty & /*$$scope, files*/ 8388609) {
				row1_changes.$$scope = { dirty, ctx };
			}

			row1.$set(row1_changes);
			const row2_changes = {};

			if (dirty & /*$$scope*/ 8388608) {
				row2_changes.$$scope = { dirty, ctx };
			}

			row2.$set(row2_changes);
			const row3_changes = {};

			if (dirty & /*$$scope*/ 8388608) {
				row3_changes.$$scope = { dirty, ctx };
			}

			row3.$set(row3_changes);
		},
		i(local) {
			if (current) return;
			transition_in(row0.$$.fragment, local);
			transition_in(row1.$$.fragment, local);
			transition_in(row2.$$.fragment, local);
			transition_in(row3.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(row0.$$.fragment, local);
			transition_out(row1.$$.fragment, local);
			transition_out(row2.$$.fragment, local);
			transition_out(row3.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(row0, detaching);
			if (detaching) detach(t0);
			destroy_component(row1, detaching);
			if (detaching) detach(t1);
			destroy_component(row2, detaching);
			if (detaching) detach(t2);
			destroy_component(row3, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let container;
	let current;

	container = new Container({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			div = element("div");
			create_component(container.$$.fragment);
			attr(div, "class", "App");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(container, div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const container_changes = {};

			if (dirty & /*$$scope, files*/ 8388609) {
				container_changes.$$scope = { dirty, ctx };
			}

			container.$set(container_changes);
		},
		i(local) {
			if (current) return;
			transition_in(container.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(container.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(container);
		}
	};
}

let fresolution = 600;
let processedFileText = "";

function cutString(string, index, endindex = 0) {
	if (endindex == 0) {
		return string.substring(index);
	} else {
		return string.substring(index, endindex);
	}
}

function instance($$self, $$props, $$invalidate) {
	let fr = new FileReader();
	let files;
	let bpm = 100.0;
	let resolution = 198;
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
			eventObjects: []
		}
	};

	let testFix = [];

	fr.onload = function () {
		let result = fr.result;
		let resolutionIndex = result.indexOf("Resolution");
		let bpmIndex = result.indexOf("0 = B");
		firstNote = Number.MAX_SAFE_INTEGER;
		let songName = cutString(result, result.indexOf("Name") + 8).substring(0, cutString(result, result.indexOf("Name") + 8).indexOf('"'));
		finishedChart.song.song = songName;

		if (bpmIndex != -1) {
			bpm = parseInt(result.substring(bpmIndex + 6)) / 1000.0;
		}

		finishedChart.song.bpm = bpm;

		if (resolutionIndex != -1) {
			resolution = parseInt(result.substring(resolutionIndex + 13));
		}

		BPMs = cutString(cutString(cutString(result, result.indexOf("[SyncTrack]")), cutString(result, result.indexOf("[SyncTrack]")).indexOf("{") + 2), 0, cutString(cutString(result, result.indexOf("[SyncTrack]")), cutString(result, result.indexOf("[SyncTrack]")).indexOf("{") + 2).indexOf("}"));
		ExpertChart = cutString(cutString(cutString(result, result.indexOf("[ExpertSingle]")), cutString(result, result.indexOf("[ExpertSingle]")).indexOf("{") + 2), 0, cutString(cutString(result, result.indexOf("[ExpertSingle]")), cutString(result, result.indexOf("[ExpertSingle]")).indexOf("{") + 2).indexOf("}"));
		populateChartData();
		let workingMaxValue = Math.ceil(chartData[chartData.length - 1][0] / (fresolution * 4));

		for (let i = 0; i < workingMaxValue; i++) {
			finishedChart.song.notes[i] = {
				startTime: i * (fresolution * 4),
				endTime: (i + 1) * (fresolution * 4),
				lengthInSteps: 16,
				mustHitSection: true,
				sectionNotes: []
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
				type: "BPM Change"
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
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finishedChart));
		var downloadAnchorNode = document.createElement("a");
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", "chart.json");
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}

	function processFile() {
		fr.readAsText(Array.from(files)[0]);
	}

	const click_handler = () => processFile();
	const click_handler_1 = () => download();

	function input_change_handler() {
		files = this.files;
		$$invalidate(0, files);
	}

	return [
		files,
		chartData,
		download,
		processFile,
		click_handler,
		click_handler_1,
		input_change_handler
	];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default App;