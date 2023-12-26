import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const StudentsDataAnalysis = ({ studentsData }) => {
    const [topInterests, setTopInterests] = useState([]);
    const [bottomInterests, setBottomInterests] = useState([]);
    const [distinctInterestsCount, setDistinctInterestsCount] = useState(0);
    const [provincialDistribution, setProvincialDistribution] = useState({});
    const [studentsCreatedDaily, setStudentsCreatedDaily] = useState({});
    const [ageDistribution, setAgeDistribution] = useState({});
    const [departmentDistribution, setDepartmentDistribution] = useState({});
    const [degreeDistribution, setDegreeDistribution] = useState({});
    const [genderDistribution, setGenderDistribution] = useState({});
    const [studentStatus, setStudentStatus] = useState({
        enrolled: 0,
        aboutToGraduate: 0,
        currentlyStudying: 0,
        graduated: 0,
    });

    useEffect(() => {
        // Calculate top and bottom 5 interests based on frequency
        const interestsCount = studentsData.reduce((acc, student) => {
            acc[student.interest] = (acc[student.interest] || 0) + 1;
            return acc;
        }, {});

        const sortedInterests = Object.keys(interestsCount).sort(
            (a, b) => interestsCount[b] - interestsCount[a]
        );

        setTopInterests(sortedInterests.slice(0, 5));
        setBottomInterests(sortedInterests.slice(-5));

        // Calculate distinct interests count
        const distinctInterests = new Set(studentsData.map((student) => student.interest));
        setDistinctInterestsCount(distinctInterests.size);

        // Calculate provincial distribution
        const provincialCounts = studentsData.reduce((acc, student) => {
            acc[student.city] = (acc[student.city] || 0) + 1;
            return acc;
        }, {});
        setProvincialDistribution(provincialCounts);


        // Calculate students created daily
        const currentDate = new Date();
        const thirtyDaysAgo = new Date(currentDate);
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);

        const studentsCreatedCounts = studentsData.reduce((acc, student) => {
            const createdDate = new Date(student.created);
            // Check if the student was created in the last 30 days
            if (createdDate >= thirtyDaysAgo && createdDate <= currentDate) {
                const dateKey = createdDate.toISOString().split('T')[0];
                acc[dateKey] = (acc[dateKey] || 0) + 1;
            }
            return acc;
        }, {});

        setStudentsCreatedDaily(studentsCreatedCounts);

        // Calculate age distribution
        const ageCounts = studentsData.reduce((acc, student) => {
            const age = parseInt(student.age);
            acc[age] = (acc[age] || 0) + 1;
            return acc;
        }, {});
        setAgeDistribution(ageCounts);

        // Calculate department distribution
        const departmentCounts = studentsData.reduce((acc, student) => {
            acc[student.department] = (acc[student.department] || 0) + 1;
            return acc;
        }, {});
        setDepartmentDistribution(departmentCounts);

        // Calculate degree distribution
        const degreeCounts = studentsData.reduce((acc, student) => {
            acc[student.degree] = (acc[student.degree] || 0) + 1;
            return acc;
        }, {});
        setDegreeDistribution(degreeCounts);

        // Calculate gender distribution
        const genderCounts = studentsData.reduce((acc, student) => {
            acc[student.gender] = (acc[student.gender] || 0) + 1;
            return acc;
        }, {});
        setGenderDistribution(genderCounts);

        // Calculate student status
        const statusCounts = studentsData.reduce((acc, student) => {
            switch (student.status) {
                case 'enrolled':
                    acc.enrolled += 1;
                    break;
                case 'about to graduate':
                    acc.aboutToGraduate += 1;
                    break;
                case 'currently studying':
                    acc.currentlyStudying += 1;
                    break;
                case 'graduated':
                    acc.graduated += 1;
                    break;
                default:
                    break;
            }
            return acc;
        }, { enrolled: 0, aboutToGraduate: 0, currentlyStudying: 0, graduated: 0 });
        setStudentStatus(statusCounts);
    }, [studentsData]);

    const pieChartData = [['City', 'Number of Students'], ...Object.entries(provincialDistribution)];

    const pieChartOptions = {
        title: 'City Distribution',
        pieHole: 0.4,

    };

    const pieChartData2 = [['Department', 'Number of Students'], ...Object.entries(departmentDistribution)];

    const pieChartOptions2 = {
        title: 'Department Distribution',
        pieHole: 0.4,

    };

    const pieChartData3 = [['Degree', 'Number of Students'], ...Object.entries(degreeDistribution)];

    const pieChartOptions3 = {
        title: 'Degree Distribution',
        pieHole: 0.4,

    };
    const pieChartData4 = [['Gender', 'Number of Students'], ...Object.entries(genderDistribution)];

    const pieChartOptions4 = {
        title: 'Gender Distribution',
        pieHole: 0.4,

    };

    const ageChartData = [['Age', 'Age'], ...Object.entries(ageDistribution)];
    const ageChartOptions = {
        title: 'Age Distribution',
        chartArea: { width: '100%' },
        hAxis: { title: 'Number of Students', minValue: 0 },
        vAxis: { title: 'Age' },

    };

    const lineChartData = [['Date', 'Number of Students'], ...Object.entries(studentsCreatedDaily).map(([date, count]) => [date, count])];

    const lineChartOptions = {
        title: 'Students Created in the Last 30 Days',
        curveType: 'function',
        legend: { position: 'bottom' },
    };

    const activityData = [
        { timestamp: "2023-01-01T08:00:00", activity: "Navigate", page: "Dashboard" },
        { timestamp: "2023-01-02T10:30:00", activity: "React", component: "Button" },
        { timestamp: "2023-01-03T12:45:00", activity: "Navigate", page: "Settings" },
        { timestamp: "2023-01-04T14:20:00", activity: "React", component: "Dropdown" },
        { timestamp: "2023-01-05T09:10:00", activity: "Navigate", page: "Dashboard" },
        { timestamp: "2023-01-06T11:45:00", activity: "React", component: "Form" },
        { timestamp: "2023-01-07T13:30:00", activity: "Navigate", page: "Reports" },
        { timestamp: "2023-01-08T15:15:00", activity: "React", component: "Chart" },
        { timestamp: "2023-01-09T17:40:00", activity: "Navigate", page: "Dashboard" },
        { timestamp: "2023-01-10T19:25:00", activity: "React", component: "Table" },
        { timestamp: "2023-01-11T08:30:00", activity: "Navigate", page: "Settings" },
        { timestamp: "2023-01-12T10:15:00", activity: "React", component: "Dropdown" },
        { timestamp: "2023-01-13T12:50:00", activity: "Navigate", page: "Reports" },
        { timestamp: "2023-01-14T14:35:00", activity: "React", component: "Button" },
        { timestamp: "2023-01-15T16:20:00", activity: "Navigate", page: "Dashboard" },
        { timestamp: "2023-01-16T18:05:00", activity: "React", component: "Form" },
        { timestamp: "2023-01-17T09:15:00", activity: "Navigate", page: "Settings" },
        { timestamp: "2023-01-18T11:00:00", activity: "React", component: "Chart" },
        { timestamp: "2023-01-19T12:45:00", activity: "Navigate", page: "Reports" },
        { timestamp: "2023-01-20T14:30:00", activity: "React", component: "Table" },
        { timestamp: "2023-01-21T16:15:00", activity: "Navigate", page: "Dashboard" },
        { timestamp: "2023-01-22T18:00:00", activity: "React", component: "Dropdown" },
        { timestamp: "2023-01-23T09:30:00", activity: "Navigate", page: "Settings" },
        { timestamp: "2023-01-24T11:15:00", activity: "React", component: "Button" },
        { timestamp: "2023-01-25T13:00:00", activity: "Navigate", page: "Reports" },
        { timestamp: "2023-01-26T14:45:00", activity: "React", component: "Form" },
        { timestamp: "2023-01-27T16:30:00", activity: "Navigate", page: "Dashboard" },
        { timestamp: "2023-01-28T18:15:00", activity: "React", component: "Chart" },
        { timestamp: "2023-01-29T09:45:00", activity: "Navigate", page: "Settings" },
        { timestamp: "2023-01-30T11:30:00", activity: "React", component: "Table" },
    ];

    const extendedHourlyUsageData = [
        { timestamp: '2023-12-26T00:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T01:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T02:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T03:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T04:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T05:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T06:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T07:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T08:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T09:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T10:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T11:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T12:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T13:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T14:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T15:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T16:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T17:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T18:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T19:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T20:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T21:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-26T22:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-26T23:00:00Z', activity: 'reaction' },
        // Fluctuations
        { timestamp: '2023-12-27T00:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-27T01:00:00Z', activity: 'reaction' },
        { timestamp: '2023-12-27T02:00:00Z', activity: 'navigation' },
        { timestamp: '2023-12-27T03:00:00Z', activity: 'reaction' },
        // ... continue as needed
    ];

    const activityCounts = {};
    activityData.forEach(item => {
        const activityKey = `${item.activity} - ${item.page || item.component}`;
        activityCounts[activityKey] = (activityCounts[activityKey] || 0) + 1;
    });

    // Converting data for react-google-charts
    const chartData30 = [['Activity', 'Count'], ...Object.entries(activityCounts)];

    // You can continue extending or modifying this 'activityData' array as needed.
    const hourlyCounts = {};
    extendedHourlyUsageData.forEach(item => {
        const hourKey = new Date(item.timestamp).getHours();
        hourlyCounts[hourKey] = (hourlyCounts[hourKey] || 0) + 1;
    });

    // Converting data for react-google-charts
    const chartData24 = [['Hour', 'Count'], ...Object.entries(hourlyCounts).map(([hour, count]) => [parseInt(hour), count])];


    return (
        <>

            <div className='w-screen pl-12'>
                <h4 className='font-bold mt-6'>Interests Distribution</h4>
                <div className='pt-8 px-3 font-medium w-4/12 m-auto mb-6'>
                    <h6>Top 5 Interests</h6>
                    <div className='mt-1'>
                        {topInterests.map((interest, index) => (
                            <div className='inline bg-green-400 my-2 p-2 border border-gray-900 mr-2' key={index}>{interest}</div>
                        ))}
                    </div>
                    <div className='mt-3 font-medium'>
                        <h6>Bottom 5 Interests:</h6>
                        <div>
                            {bottomInterests.map((interest, index) => (
                                <div className='inline text-white bg-red-600 my-2 p-2 border border-gray-950 mr-2' key={index}>{interest}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <h4 className='font-bold mt-6'>Distinct Interests</h4>
                <div className='pl-12 ml-10 w-4/12 pt-3 m-auto'>
                    <div className='h-36 w-2/4 flex flex-col p-2 border-2 border-gray-400'><div className='text-center px-4'>Distinct Interests</div><div className='font-extrabold text-4xl  h-10 w-10 m-auto'>{distinctInterestsCount}</div></div>
                </div>

                <h4 className='font-bold mt-9'>Students' Gender Distribution Ratio</h4>
                <div className='text-center w-4/12 h-full m-auto' >
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="300px"
                        data={pieChartData4}
                        options={pieChartOptions4}
                    />
                </div>

                <h4 className='font-bold mt-9'>City Distribution</h4>
                <div className='text-center w-4/12 h-full m-auto' >
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="300px"
                        data={pieChartData}
                        options={pieChartOptions}
                    />
                </div>
                <h4 className='font-bold mt-9'>Department Distribution</h4>
                <div className='text-center w-4/12 h-full m-auto' >
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="300px"
                        data={pieChartData2}
                        options={pieChartOptions2}
                    />
                </div>

                <h4 className='font-bold mt-9'>Degree Distribution</h4>
                <div className='text-center w-4/12 h-full m-auto' >
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="300px"
                        data={pieChartData3}
                        options={pieChartOptions3}
                    />
                </div>

                <h4 className='font-bold mt-9'>Student Added in Last 30 days</h4>
                <div className='text-center w-4/12 h-full m-auto'>
                    <Chart
                        chartType="LineChart"
                        width="100%"
                        height="150px"
                        data={lineChartData}
                        options={lineChartOptions}
                    />
                </div>

                <h4 className='font-bold mt-9'>Age Distribution</h4>
                <div className='text-center w-4/12 h-full m-auto'>
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="300px"
                        data={ageChartData}
                        options={ageChartOptions}
                    />
                </div>

                <h4 className='font-bold mt-9'>System Usage in Last 30 days</h4>
                <div className='text-center w-8/12 h-full m-auto'>

                    <Chart
                        width={'800px'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={chartData30}
                        options={{
                            hAxis: {
                                title: 'Activity',
                            },
                            vAxis: {
                                title: 'Count',
                                minValue: 0,
                            },
                            series: {
                                0: { color: 'rgb(75, 192, 192)' },
                            },
                        }}
                    />
                </div>


                <h4 className='font-bold mt-9'>System Usage in Last 24 hours</h4>
                <div className='text-center w-8/12 h-full m-auto'>
                    <Chart
                        width={'800px'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={chartData24}
                        options={{
                            hAxis: {
                                title: 'Hour',
                            },
                            vAxis: {
                                title: 'Count',
                                minValue: 0,
                            },
                            series: {
                                0: { color: 'rgb(75, 192, 192)' },
                            },
                        }}
                    />
                </div>



                <h4 className='font-bold mt-9'>Students' Status</h4>
                <div className='text-center w-4/12 h-full m-auto border-2 border-gray-400'>
                    <table
                        className="divide-y divide-gray-200">
                        <thead
                            className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Students Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Count
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    Currently Studying
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {studentStatus.currentlyStudying}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    Enrolled
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {studentStatus.enrolled}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    About to graduate
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {studentStatus.aboutToGraduate}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    Graduated
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {studentStatus.graduated}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>

            <div className='bg-gray-700 p-2 text-white text-center mt-5'>
                <h6>Student Interests System</h6>

            </div>
        </>
    );
};

export default StudentsDataAnalysis
