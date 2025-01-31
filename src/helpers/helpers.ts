export function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",").map(header => header.toLowerCase());

  const data = lines.slice(1).map(line => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, i) => [header, values[i]?.replace(/"/g, '')]));
  });

  return data;
}

export function handleFileUpload(event, setData) {
  const files = event.target.files;
  if (!files || !files.length) {
    console.error("No files selected.");
    return;
  }

  const readers = [];
  let combinedData = [];

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    readers.push(reader);

    reader.onload = function (e) {
      const text = e.target.result;
      const jsonData = parseCSV(text);
      combinedData = [...combinedData, ...jsonData];

      if (readers.every(r => r.readyState === 2)) {
        setData(combinedData);
      }
    };

    reader.readAsText(files[i]);
  }
}

function timeToSeconds(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}


export function groupDataByCategory(data) {
  return data.reduce((acc, exercise) => {
    const category = exercise["activity type"];
    if (!acc[category]) {
      acc[category] = {
        exercises: [],
        totalTime: 0,
        totalCalories: 0
      };
    }

    acc[category].exercises.push(exercise);
    acc[category].totalTime += timeToSeconds(exercise.time);
    acc[category].totalCalories += parseInt(exercise.calories);
    return acc;
  }, {});
}

export function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

