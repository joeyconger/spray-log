import { useState, useRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

const LISTS = ["TAC 100", "TAC 295 Big Spray", "TAC 295 Small Spray", "Trails"];

const TAC_295_BIG_ACQUISITION_LOTS = [
  {code:"AL1006",name:"MINGO",address:"200 S 94 E AVE",miles:"",linearFeet:"",acreage:"90.00"},
  {code:"AL1007",name:"AUDUBON",address:"3000 S 86 E AVE",miles:"",linearFeet:"",acreage:"11.30"},
  {code:"AL1008",name:"COAL CREEK",address:"5200 E WOODROW",miles:"",linearFeet:"",acreage:"3.17"},
  {code:"AL1009",name:"CROW CREEK",address:"3200 S DETROIT",miles:"",linearFeet:"",acreage:"0.54"},
  {code:"AL1010",name:"FLATROCK",address:"4100 N LEWIS",miles:"",linearFeet:"",acreage:"7.20"},
  {code:"AL1011",name:"FLATROCK",address:"2735 E 49 ST N",miles:"",linearFeet:"",acreage:"1.50"},
  {code:"AL1012",name:"DIRTY BUTTER",address:"100 E TECUMSEH",miles:"",linearFeet:"",acreage:"0.46"},
  {code:"AL1013",name:"DIRTY BUTTER",address:"1520 N DENVER",miles:"",linearFeet:"",acreage:"0.45"},
  {code:"AL1015",name:"HARLOW CREEK",address:"4500 W EASTON",miles:"",linearFeet:"",acreage:"1.66"},
  {code:"AL1016",name:"GARDEN CITY",address:"3700 S GALVESTON",miles:"",linearFeet:"",acreage:"5.10"},
  {code:"AL1029",name:"SWEETBRIAR EAST EXTENTION",address:"7700 S 73 E AVE",miles:"",linearFeet:"",acreage:"0.75"},
  {code:"AL1030",name:"SPRINGDALE",address:"1800 N WHEELING",miles:"",linearFeet:"",acreage:"26.00"},
  {code:"AL1031",name:"APACHE STREET BRIDGE",address:"900 E APACHE",miles:"",linearFeet:"",acreage:"7.10"},
  {code:"AL1032",name:"HOLIDAY PARK",address:"10759 E ADMIRAL PL",miles:"",linearFeet:"",acreage:"26.00"},
  {code:"AL1033",name:"CHEROKEE POOL LOT",address:"1632 S 119 E AVE",miles:"",linearFeet:"",acreage:"0.16"},
  {code:"AL1034",name:"KINGSTON SUMP",address:"6100 E READING",miles:"",linearFeet:"",acreage:"2.00"},
  {code:"AL1035",name:"REDFORK",address:"4500 S YUKON",miles:"",linearFeet:"",acreage:"1.60"},
  {code:"AL1036",name:"MINGO 11th TO 17th",address:"1100 S 94 E AVE",miles:"",linearFeet:"",acreage:"18.00"},
  {code:"AL1038",name:"COOLEY LAKE",address:"12326 E ARCHER",miles:"",linearFeet:"",acreage:"7.58"},
  {code:"AL1039",name:"VERN RAYBURN",address:"4700 W 8TH ST",miles:"",linearFeet:"",acreage:"4.00"},
  {code:"AL1040",name:"CARMEN MINISTRIES",address:"8500 S MEMORIAL",miles:"",linearFeet:"",acreage:"3.50"},
  {code:"AL1042",name:"DIRTY BUTTER",address:"2200 N LANSING",miles:"",linearFeet:"",acreage:"2.50"},
  {code:"AL1043",name:"XYLER DETENTION LOT",address:"2301 N ATLANTA CT",miles:"",linearFeet:"",acreage:"1.00"},
  {code:"AL1044",name:"SUNGATE LOTS",address:"6898 E 56TH ST",miles:"",linearFeet:"",acreage:"0.75"},
  {code:"AL1045",name:"MILL CREEK",address:"5950 E 11th St",miles:"",linearFeet:"",acreage:"2.40"},
  {code:"AL1046",name:"HAGER FLOOD BUYOUT",address:"8502 S ELWOOD",miles:"",linearFeet:"",acreage:"11.00"},
  {code:"AL1048",name:"UPPER MINGO LOTS",address:"6519 S 78 E AVE",miles:"",linearFeet:"",acreage:"1.00"},
  {code:"AL1050",name:"HOUSE LOT",address:"2625 E 22 PL",miles:"",linearFeet:"",acreage:"0.50"},
  {code:"AL1051",name:"DIRTY BUTTER",address:"1726 E 31 PL N",miles:"",linearFeet:"",acreage:"1.00"},
  {code:"AL1052",name:"LOT 9, BLK 1, WALTER FOSTER ADDN",address:"4154-6 E 33 St",miles:"",linearFeet:"",acreage:"0.30"},
  {code:"AL1053",name:"ELM CREEK ACQUISITION",address:"1404 E ADMIRAL PL",miles:"",linearFeet:"",acreage:"0.20"},
  {code:"AL1054",name:"EASTLAND",address:"2150 S 120 E AVE",miles:"",linearFeet:"",acreage:"1.50"},
  {code:"AL1055",name:"LT 18 BLK 6 MIDWAY ADDN",address:"1623 E 4 ST",miles:"",linearFeet:"",acreage:"0.20"},
  {code:"AL1056",name:'COOLEY LAKE "B"',address:"11391 E ARCHER ST",miles:"",linearFeet:"",acreage:"4.70"},
  {code:"AL1058",name:"HAGER ACQUISITION",address:"8901 S 33 W AVE",miles:"",linearFeet:"",acreage:"3.80"},
  {code:"AL1059",name:"Lot 6 Blk 1 Lynn Lane Estates",address:"17212 E 11th St",miles:"",linearFeet:"",acreage:"7.30"},
  {code:"AL1060",name:"VALLEY VIEW LOT",address:"531 E 51 PL N",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1061",name:"Lot 19 blk 1 Bridal trails Estates",address:"10524 S 77 E Ave",miles:"",linearFeet:"",acreage:"1.00"},
  {code:"AL1062",name:"Kingsbury II Reserve A and B",address:"9200 S 71 E Ave",miles:"",linearFeet:"",acreage:"3.00"},
  {code:"AL1063",name:"Lot 8 and 9 Magic Circle",address:"1746 S 110 E Ave",miles:"",linearFeet:"",acreage:"0.50"},
  {code:"AL1064",name:"Lot 9 Blk 3 Meadowbrook Heights",address:"405 S 129 E Ave",miles:"",linearFeet:"",acreage:"0.50"},
  {code:"AL1065",name:"Dirty Butter trail acquisition",address:"675 E Tecumseh",miles:"",linearFeet:"",acreage:"6.61"},
  {code:"AL1066",name:"Valley View Lot",address:"410 E 58th St N",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1067",name:"Darlington Acquisition",address:"2100 N Darlington Ave, 2207 N Darlington Pl",miles:"",linearFeet:"",acreage:"4.15"},
  {code:"AL1068",name:"Vienna Woods Drainage acquisition",address:"6929 S Knoxville Pl",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1069",name:"5525 E Ute",address:"5525 E Ute",miles:"",linearFeet:"",acreage:"0.50"},
  {code:"AL1070",name:"1225 S 141 E Ave",address:"1225 S 141 E Ave",miles:"",linearFeet:"",acreage:"0.30"},
  {code:"AL1071",name:"13311 E 27th St South",address:"13311 E 27th St South",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1072",name:"Lot 11 and 12 Hackathorn addition",address:"423 S Trenton",miles:"",linearFeet:"",acreage:"0.32"},
  {code:"AL1073",name:"Lot 14 Block 4, Town and Country",address:"3829 E 72nd St",miles:"",linearFeet:"",acreage:"0.70"},
  {code:"AL1074",name:"Crow creek Acquisition",address:"1030 E 32nd Pl",miles:"",linearFeet:"",acreage:"0.32"},
  {code:"AL1075",name:"Magic Circle Acquisition",address:"1722 S 106 EA",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1076",name:"Lot 2 Block 7 Walnut Creek III",address:"3027 E 82 St",miles:"",linearFeet:"",acreage:"2.25"},
  {code:"AL1077",name:"Voluntary Flood Acquisition",address:"9550 E Latimer St",miles:"",linearFeet:"",acreage:"0.34"},
  {code:"AL1078",name:"Lot 1 Block 1 Mountain Manor 2nd",address:"2929 W 53 St",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1079",name:"Lot 29 Blk 15 Magic Circle",address:"1820 S 106 EA",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1080",name:"Lot 24 Blk 1 Rustic Hills",address:"5817 S New Haven",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1081",name:"Castles Acquisition",address:"3815 E 58 St",miles:"",linearFeet:"",acreage:"0.81"},
  {code:"AL1082",name:"Bridal Trails Estates Acquisition 2",address:"10209 and 10221 S 76 E Ave",miles:"",linearFeet:"",acreage:"2.10"},
  {code:"AL1083",name:"Lot 2 Blk 1 Southridge Estates 3rd",address:"7255 S Pittsburg",miles:"",linearFeet:"",acreage:"0.50"},
  {code:"AL1084",name:"Lewiston Gardens Acquisition",address:"2415 E 18 St and 2412 E 17 Pl",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1086",name:"4415 E 38 St",address:"4415 E 38 St",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1087",name:"Elm Creek Acquisition",address:"1536 E 8 St",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1088",name:"Elm Creek Acquisition",address:"1007 E 5 St",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1089",name:"Crow Creek Acquisition",address:"3202 S Peoria Av",miles:"",linearFeet:"",acreage:"1.15"},
  {code:"AL1090",name:"Arrowwood Acquisition",address:"4508 E 39 St",miles:"",linearFeet:"",acreage:"0.17"},
  {code:"AL1091",name:"BS Roberts Park",address:"1000 N Greenwood",miles:"",linearFeet:"",acreage:"9.44"},
  {code:"AL1092",name:"Kirkmore Acquisition",address:"2550-2552 S Jamestown",miles:"",linearFeet:"",acreage:"0.50"},
  {code:"AL1093",name:"Coal Creek Acquisition",address:"1041 N Oswego",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1094",name:"2818 E 38 ST",address:"2818 E 38 ST",miles:"",linearFeet:"",acreage:"0.50"},
  {code:"AL1097",name:"Hammond Acquisition",address:"3812 E 58 St",miles:"",linearFeet:"",acreage:"0.65"},
  {code:"AL1100",name:"Tupelo Acquisition",address:"2127 S 125 EA",miles:"",linearFeet:"",acreage:"2.37"},
  {code:"AL1101",name:"Lewiston Gardens Acquisition",address:"2431 E 17 Pl",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1102",name:"Lot 17, Block 1, Rustic Hills",address:"3916 E 59 ST",miles:"",linearFeet:"",acreage:"0.50"},
  {code:"AL1103",name:"Acquisition Lot",address:"2920 S Delaware Ave",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1104",name:"Pete Rose Acquisition",address:"522 S 90 EA",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1105",name:"TDA Lot",address:"1201 E 5 ST",miles:"",linearFeet:"",acreage:"0.14"},
  {code:"AL1106",name:"TDA Lot",address:"1020 E 5 ST",miles:"",linearFeet:"",acreage:"0.16"},
  {code:"AL1107",name:"TDA Lot",address:"1115 E 5 PL",miles:"",linearFeet:"",acreage:"0.16"},
  {code:"AL1108",name:"TDA Lot",address:"507 S NORFOLK AV",miles:"",linearFeet:"",acreage:"0.30"},
  {code:"AL1109",name:"TDA Lot",address:"1645 N GREENWOOD PL",miles:"",linearFeet:"",acreage:"0.57"},
  {code:"AL1110",name:"TDA Lot",address:"1643 N GREENWOOD AV",miles:"",linearFeet:"",acreage:"0.32"},
  {code:"AL1111",name:"TDA Lot",address:"2143 N LANSING AV",miles:"",linearFeet:"",acreage:"0.31"},
  {code:"AL1112",name:"TDA Lot",address:"630 E SEMINOLE PL",miles:"",linearFeet:"",acreage:"0.91"},
  {code:"AL1113",name:"TDA Lot",address:"557 E SEMINOLE PL",miles:"",linearFeet:"",acreage:"0.21"},
  {code:"AL1114",name:"TDA Lot",address:"240 E UTE PL",miles:"",linearFeet:"",acreage:"0.41"},
  {code:"AL1115",name:"TDA Lot",address:"232 E UTE PL",miles:"",linearFeet:"",acreage:"0.41"},
  {code:"AL1116",name:"TDA Lot",address:"2129 N GARRISON PL",miles:"",linearFeet:"",acreage:"0.34"},
  {code:"AL1117",name:"TDA Lot",address:"2148 N GARRISON PL",miles:"",linearFeet:"",acreage:"0.20"},
  {code:"AL1118",name:"TDA Lot",address:"5808 N FRANKFORT AV",miles:"",linearFeet:"",acreage:"0.18"},
  {code:"AL1119",name:"Rockford Acquisition",address:"703 N ROCKFORD AV",miles:"",linearFeet:"",acreage:"0.23"},
  {code:"AL1120",name:"Bridle Trails West",address:"10115 S 76 E AV",miles:"",linearFeet:"",acreage:"0.82"},
  {code:"AL1121",name:"Bridle Trails East",address:"10112 S 77 E AV",miles:"",linearFeet:"",acreage:"0.89"},
  {code:"AL1122",name:"Pearl District Acquisition",address:"702 S ST. LOUIS AV",miles:"",linearFeet:"",acreage:"0.25"},
  {code:"AL1123",name:"Parkview Acquisition Lot",address:"2116 W Easton Street",miles:"",linearFeet:"",acreage:"1.88"},
  {code:"AL1124",name:"Dirty Butter Acquisition Lot",address:"316 E. Virgin St. N.",miles:"",linearFeet:"",acreage:"0.27"},
  {code:"AL1125",name:"Coal-Acquisition",address:"3025 N Erie Ave",miles:"",linearFeet:"",acreage:"10.45"},
  {code:"AL1126",name:"HAIKEY ACQUISITION LOT",address:"9300 S MINGO RD",miles:"",linearFeet:"",acreage:"6.10"},
  {code:"AL1127",name:"MILL CREEK",address:"8526 E 12 STREET",miles:"",linearFeet:"",acreage:"0.41"},
  {code:"AL1128",name:"FRED CREEK I ACQUISITION LOT",address:"3832 E 72 STREET",miles:"",linearFeet:"",acreage:"0.79"},
  {code:"AL1129",name:"FRED CREEK II ACQUISITION LOT",address:"3714 E 72 STREET",miles:"",linearFeet:"",acreage:"0.75"},
  {code:"AL1130",name:"CROW ACQUISITION LOT II",address:"2142 S DELAWARE COURT, LOT 8, BLOCK 3",miles:"",linearFeet:"",acreage:"0.17"},
  {code:"AL1132",name:"WEST PARK ACQUISITION LOT",address:"2424 E 4 STREET S.",miles:"",linearFeet:"",acreage:"0.18"},
  {code:"AL1133",name:"BRIDAL TRAILS ESTATE NORTH",address:"7463 E 101 STREET S.",miles:"",linearFeet:"",acreage:"2.81"},
  {code:"AL1134",name:"HAGER A",address:"201 W 81 STREET (N. SIDE OF 81 ST. S.)",miles:"",linearFeet:"",acreage:"2.46"},
  {code:"AL1135",name:"HAGER B",address:"260 W 81 STREET (S. SIDE OF 81 ST. S.)",miles:"",linearFeet:"",acreage:"1.33"},
  {code:"AL1136",name:"HAGER C",address:"260 W 81 STREET SOUTH",miles:"",linearFeet:"",acreage:"1.19"},
  {code:"AL1137",name:"HAGER D",address:"245 W 81 STREET SOUTH",miles:"",linearFeet:"",acreage:"2.52"},
  {code:"AL1138",name:"OWEN",address:"6 S QUANAH AVENUE",miles:"",linearFeet:"",acreage:"0.18"},
  {code:"AL1139",name:"ANGEL WING",address:"7100 S UNION AVENUE",miles:"",linearFeet:"",acreage:"4.37"},
  {code:"AL1140",name:"SOUTHRIDGE ESTATES A",address:"4330 E 74 PLACE SOUTH",miles:"",linearFeet:"",acreage:"0.34"},
  {code:"AL1141",name:"SOUTHRIDGE ESTATES B",address:"4322 E 74 PLACE SOUTH",miles:"",linearFeet:"",acreage:"0.34"},
  {code:"AL1142",name:"WALNUT CREEK A",address:"8201 S GARY AVENUE",miles:"",linearFeet:"",acreage:"0.21"},
  {code:"AL1143",name:"PARK DALE A",address:"708 S TRENTON AV",miles:"",linearFeet:"",acreage:"0.16"},
  {code:"AL1144",name:"PARK DALE B",address:"710 S TRENTON AV",miles:"",linearFeet:"",acreage:"0.16"},
  {code:"AL1146",name:"OWEN II",address:"18 SOUTH QUANAH AV",miles:"",linearFeet:"",acreage:"0.06"},
  {code:"AL1147",name:"SUNSET TERRACE",address:"2804 S CINCINNATI",miles:"",linearFeet:"",acreage:"0.40"},
  {code:"AL1148",name:"CENTRAL PARK PLACE",address:"511 S MADISON AVE",miles:"",linearFeet:"",acreage:"0.08"},
  {code:"AL1149",name:"RANCH ACRES",address:"3908 S. EVANSTON",miles:"",linearFeet:"",acreage:"0.52"},
  {code:"AL1150",name:"HARTE'S RESUB",address:"2620 E. 22ND ST",miles:"",linearFeet:"",acreage:"0.24"},
  {code:"AL1151",name:"Owen III",address:"32 SOUTH QUANAH AV",miles:"",linearFeet:"",acreage:"0.18"},
  {code:"AL1153",name:"4137 N Frankford Pl",address:"4137 N Frankford Pl",miles:"",linearFeet:"",acreage:"0.22"},
];

const TAC_100_JOBS = [
  {code:"1",name:"1700 S. 119th E. Ave",address:"",miles:"",linearFeet:"",acreage:"4.1"},
  {code:"2",name:"3100 S. 101st E. Ave",address:"",miles:"",linearFeet:"",acreage:"8.67"},
  {code:"3",name:"3100 S. 108th E. Ave",address:"",miles:"",linearFeet:"",acreage:"1.9"},
  {code:"4",name:"3800 Block S. Mingo Valley Exp HWY 169",address:"",miles:"",linearFeet:"",acreage:"5.16"},
  {code:"5",name:"8800 Block E. BA Exp",address:"",miles:"",linearFeet:"",acreage:"1.9"},
  {code:"6",name:"3500 S. 88th E. Ave",address:"",miles:"",linearFeet:"",acreage:"3.16"},
  {code:"7",name:"Joe Creek - 7100 S. to Riverside",address:"",miles:"",linearFeet:"",acreage:"28.62"},
  {code:"8",name:"Joe Creek - 6300 S. to 71st St.",address:"",miles:"",linearFeet:"",acreage:"26.34"},
  {code:"9",name:"4100 N. Cincinnati (Flat Rock)",address:"",miles:"",linearFeet:"",acreage:"24.82"},
  {code:"10",name:"4800 N. Iroquois (Valley View) to Flatrock creek",address:"",miles:"",linearFeet:"",acreage:"7.74"},
  {code:"11",name:"6700 S. 90th E. Ave",address:"",miles:"",linearFeet:"",acreage:"5.71"},
  {code:"12",name:"5500 S. Garnett Rd",address:"",miles:"",linearFeet:"",acreage:"2.08"},
  {code:"13",name:"Mingo Creek - I-244 S. to Mingo Rd",address:"",miles:"",linearFeet:"",acreage:"14.11"},
  {code:"14",name:"Mingo Creek - 5100 S. to 5800 S.",address:"",miles:"",linearFeet:"",acreage:"17.37"},
  {code:"15",name:"4700 S Elwood Cherry Creek Lined channel",address:"",miles:"",linearFeet:"",acreage:"12.5"},
  {code:"16",name:"6540 S. Lewis Ave",address:"",miles:"",linearFeet:"",acreage:"0.65"},
  {code:"17",name:"Parkview Cannel 120 S 41st W Ave",address:"",miles:"",linearFeet:"",acreage:"13.79"},
  {code:"18",name:"8009 S. 77th E. Ave",address:"",miles:"",linearFeet:"",acreage:"0.21"},
  {code:"19",name:"9100 E. 41st St.",address:"",miles:"",linearFeet:"",acreage:"0.06"},
  {code:"20",name:"4100 S. 87th E. Ave",address:"",miles:"",linearFeet:"",acreage:"0.14"},
  {code:"21",name:"4100 S. 112th E. Ave",address:"",miles:"",linearFeet:"",acreage:"1.55"},
  {code:"22",name:"12188 E. 21st Ct.",address:"",miles:"",linearFeet:"",acreage:"0.16"},
  {code:"23",name:"1520 S. Memorial Dr",address:"",miles:"",linearFeet:"",acreage:"0.23"},
  {code:"24",name:"1420 S. Joplin Ave",address:"",miles:"",linearFeet:"",acreage:"0.32"},
  {code:"25",name:"11124 E. 11th Ct",address:"",miles:"",linearFeet:"",acreage:"0.6"},
  {code:"26",name:"7300 E. Admiral Pl",address:"",miles:"",linearFeet:"",acreage:"0.24"},
  {code:"27",name:"2740 N. Maplewood Ave",address:"",miles:"",linearFeet:"",acreage:"0.15"},
  {code:"28",name:"2317 N. Atlanta Ave",address:"",miles:"",linearFeet:"",acreage:"0.09"},
  {code:"29",name:"3500 N. Columbia Ave",address:"",miles:"",linearFeet:"",acreage:"0.92"},
  {code:"30",name:"2817 N Hartford Ave.",address:"",miles:"",linearFeet:"",acreage:"1"},
  {code:"31",name:"5000 N. Cincinnati Ave",address:"",miles:"",linearFeet:"",acreage:"0.68"},
  {code:"32",name:"4700 W. Edison St.",address:"",miles:"",linearFeet:"",acreage:"0.04"},
  {code:"33",name:"6535 E Skelly Drive",address:"",miles:"",linearFeet:"",acreage:"0.19"},
  {code:"34",name:"36th St. N. & Hwy 169, Mingo Channel (Bottom only)",address:"",miles:"",linearFeet:"",acreage:"21.38"},
  {code:"35",name:"Mingo Main stem Pine to I-244 (Bottom only)",address:"",miles:"",linearFeet:"",acreage:"55"},
  {code:"36",name:"Mingo Mainstem -  from Pine N. to RR bridge",address:"",miles:"",linearFeet:"",acreage:"20.86"},
  {code:"37",name:"Mingo Channel 2nd and Mingo Bridge to 21 st",address:"",miles:"",linearFeet:"",acreage:"28.86"},
  {code:"38",name:"1250 N Mingo Lower Mingo Tribs",address:"",miles:"",linearFeet:"",acreage:"1.1"},
  {code:"39",name:"5600 N Elgin Valley View Channel from",address:"",miles:"",linearFeet:"",acreage:"6.23"},
  {code:"40",name:"11700 E Archer cooley creek riprap",address:"",miles:"",linearFeet:"",acreage:"1.05"},
  {code:"41",name:"10759 E Admiral - riprap in safety training center",address:"",miles:"",linearFeet:"",acreage:"5"},
  {code:"42",name:"Mingo Mainstrem Riprap from mingo road",address:"",miles:"",linearFeet:"",acreage:"1"},
  {code:"43",name:"Mingo Mainstrem Riprap and Fabrimform",address:"",miles:"",linearFeet:"",acreage:"9.05"},
  {code:"44",name:"2800 S 132 E Ave- Brookhollow channel riprap",address:"",miles:"",linearFeet:"",acreage:"5.5"},
  {code:"45",name:"3100 S 118 E Ave - riprap in creek on the north",address:"",miles:"",linearFeet:"",acreage:"4"},
  {code:"46",name:"3100 S Garnett - riprap North of shopping centers",address:"",miles:"",linearFeet:"",acreage:"2.5"},
  {code:"47",name:"Bell Creek 3900 S 89 E Ave riprap areas from the BA",address:"",miles:"",linearFeet:"",acreage:"3.5"},
  {code:"48",name:"Mingo Mainstem - 4100 S 103 E Ave - riprap thru",address:"",miles:"",linearFeet:"",acreage:"5"},
  {code:"49",name:"Bell Creek 46TH St. south to Aaronson Park.",address:"",miles:"",linearFeet:"",acreage:"3"},
  {code:"50",name:"Mingo Mainstream Riprap west of mingo RD.",address:"",miles:"",linearFeet:"",acreage:"2.5"},
  {code:"51",name:"Lil Haikey - 9100 S 89 E Ave - fabriform and trickle trail",address:"",miles:"",linearFeet:"",acreage:"4"},
  {code:"52",name:"Brookhollow Creek 110th E. Ave. 32nd st s Riprap",address:"",miles:"",linearFeet:"",acreage:"2.4"},
  {code:"53",name:"Fred Creek 7400 S harvard east of harvard",address:"",miles:"",linearFeet:"",acreage:"4"},
  {code:"54",name:"Fred Creek 7400 S Harvard Lined Channel West of harvard",address:"",miles:"",linearFeet:"",acreage:"5.04"},
  {code:"55",name:"Fred Creek 8100 S Wheeling",address:"",miles:"",linearFeet:"",acreage:"1.59"},
  {code:"56",name:"5100 S Lynn Lane from 4800 S to 5100 S on the west",address:"",miles:"",linearFeet:"",acreage:"1.51"},
  {code:"57",name:"520 E 56th St N - Valley view 56th St N South to 48th PL",address:"",miles:"",linearFeet:"",acreage:"6"},
  {code:"58",name:"500 S Mingo - Tupelo creek east of Mingo rd",address:"",miles:"",linearFeet:"",acreage:"6"},
  {code:"59",name:"101st Delaware Dr. (School)",address:"",miles:"",linearFeet:"",acreage:"1.1"},
  {code:"60",name:"9800 S. Delaware Dr.",address:"",miles:"",linearFeet:"",acreage:"2.1"},
  {code:"61",name:"Vensel Creek - 97 S. Delaware",address:"",miles:"",linearFeet:"",acreage:"5.5"},
  {code:"62",name:"Valley  View 46 st north to Iroquois Ave.",address:"",miles:"",linearFeet:"",acreage:"1.5"},
  {code:"63",name:"Mingo creek from 31st to 41st rip rap",address:"",miles:"",linearFeet:"",acreage:"1.5"},
  {code:"64",name:"America Lines Brake Shop 11501 E PINE",address:"",miles:"",linearFeet:"",acreage:"2"},
  {code:"65",name:"4700 S Jamestown",address:"",miles:"",linearFeet:"",acreage:"4.24"},
  {code:"66",name:"1300 N New Haven",address:"",miles:"",linearFeet:"",acreage:"0.94"},
  {code:"67",name:"4700 BLK HWY 169",address:"",miles:"",linearFeet:"",acreage:"5"},
  {code:"68",name:"Mingo Creek Liner to 41st 2700 S 95th E Ave",address:"",miles:"",linearFeet:"",acreage:"19.1"},
  {code:"69",name:"6800 S Lewis",address:"",miles:"",linearFeet:"",acreage:"0.98"},
  {code:"70",name:"9800  S 74th E Ave",address:"",miles:"",linearFeet:"",acreage:"0.51"},
  {code:"71",name:"3200 S Peoria",address:"",miles:"",linearFeet:"",acreage:"2.5"},
  {code:"72",name:"11900 E 21st St S",address:"",miles:"",linearFeet:"",acreage:"1"},
  {code:"73",name:"4500 S 93rd E Ave",address:"",miles:"",linearFeet:"",acreage:"3.1"},
  {code:"74",name:"Mingo Mainstem Riprap from Mingo Rd to 11th St S",address:"",miles:"",linearFeet:"",acreage:"7"},
];

const DEFAULT_CHEM = {
  "TAC 100":             { pesticide:"Glyphosate", tradeName:"Round Up Custom", manufacturer:"Monsanto", tankConc:"1%", epaReg:"524-343", epaEst:"524-IA-1", applicatorType:"Recirculating Sprayer", ratePerAcre:"12 oz per acre", gallonsMixture:"", amountApplied:"", rateCarrier:"" },
  "TAC 295 Big Spray":   { pesticide:"Glyphosate", tradeName:"Round Up Custom", manufacturer:"Monsanto", tankConc:"1%", epaReg:"524-343", epaEst:"524-IA-1", applicatorType:"Recirculating Sprayer", ratePerAcre:"12 oz per acre", gallonsMixture:"", amountApplied:"", rateCarrier:"" },
  "TAC 295 Small Spray": { pesticide:"Glyphosate", tradeName:"Round Up Custom", manufacturer:"Monsanto", tankConc:"1%", epaReg:"524-343", epaEst:"524-IA-1", applicatorType:"Recirculating Sprayer", ratePerAcre:"12 oz per acre", gallonsMixture:"", amountApplied:"", rateCarrier:"" },
  "Trails":              { pesticide:"Glyphosate", tradeName:"Round Up Custom", manufacturer:"Monsanto", tankConc:"1%", epaReg:"524-343", epaEst:"524-IA-1", applicatorType:"Recirculating Sprayer", ratePerAcre:"12 oz per acre", gallonsMixture:"", amountApplied:"", rateCarrier:"" },
};

// ── API helpers ───────────────────────────────────────────────────────────────
const api = {
  get: (path)       => fetch(path).then(r => r.ok ? r.json() : null).catch(() => null),
  put: (path, body) => fetch(path, { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) }).catch(()=>{}),
};

// ── Storage (with debounced API sync) ─────────────────────────────────────────
function useLS(key, init, apiPath) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  const timer = useRef(null);
  const set = useCallback(v => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
    if (apiPath) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => api.put(apiPath, v), 500);
    }
  }, [key, apiPath]);
  return [val, set];
}

// ── Weather (in-memory cache keyed by "lat,lon,date,hour") ───────────────────
const weatherCache = new Map();
const geocodeCache = new Map();

function parseHour(t) {
  if (!t) return 10;
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!m) return 10;
  let h = parseInt(m[1]);
  const ap = (m[3]||"").toUpperCase();
  if (ap==="PM" && h!==12) h+=12;
  if (ap==="AM" && h===12) h=0;
  return Math.min(Math.max(h,0),23);
}

function parseTimeInput(val) {
  const m = val.match(/^(.+?)\s*[-–]\s*(.+)$/);
  if (m) return { start: m[1].trim(), end: m[2].trim() };
  return { start: val.trim(), end: "" };
}

async function geocode(address) {
  if (geocodeCache.has(address)) return geocodeCache.get(address);
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address+", Tulsa, OK")}&format=json&limit=1`,
      { headers: { "User-Agent":"SprayLogApp/1.0" } }
    );
    const d = await r.json();
    if (d[0]) {
      const result = { lat: parseFloat(d[0].lat), lon: parseFloat(d[0].lon) };
      geocodeCache.set(address, result);
      return result;
    }
  } catch {}
  return { lat: 36.154, lon: -95.993 };
}

async function getWeather(lat, lon, dateStr, timeStr) {
  const h = parseHour(timeStr);
  const cacheKey = `${lat.toFixed(3)},${lon.toFixed(3)},${dateStr},${h}`;
  if (weatherCache.has(cacheKey)) return weatherCache.get(cacheKey);

  const past = new Date(dateStr+"T12:00:00") < new Date();
  const base = past
    ? "https://archive-api.open-meteo.com/v1/archive"
    : "https://api.open-meteo.com/v1/forecast";
  const url = `${base}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,windspeed_10m,winddirection_10m,cloudcover&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FChicago&start_date=${dateStr}&end_date=${dateStr}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("Weather API " + r.status);
  const d = await r.json();
  if (d.error) throw new Error(d.reason);
  const temp  = d.hourly?.temperature_2m?.[h];
  const wind  = d.hourly?.windspeed_10m?.[h];
  const wdeg  = d.hourly?.winddirection_10m?.[h];
  const cloud = d.hourly?.cloudcover?.[h];
  if (temp == null) throw new Error("No data for that hour");
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  const dir  = dirs[Math.round((wdeg||0)/45)%8]||"N";
  let sky = "Clear";
  if (cloud > 70) sky = "Cloudy";
  else if (cloud > 25) sky = "Partly Cloudy";
  const result = { temp: Math.round(temp), wind: Math.min(Math.round(wind||0), 9), windDir: dir, sky };
  weatherCache.set(cacheKey, result);
  return result;
}


// ── Print builders ────────────────────────────────────────────────────────────
function trailsHTML(entries, listName) {
  const rows = entries.map(({job,weather}) => `<tr>
    <td>${job.date||""}</td><td>${job.name||""}</td><td>${job.address||""}</td>
    <td>${job.miles||""}</td><td>${job.linearFeet||""}</td>
    <td>${job.timeStart||""}</td><td>${job.timeEnd||""}</td>
    <td>${weather?.sky||""}</td><td>${weather?.temp!=null?weather.temp:""}</td>
    <td>${weather?.wind!=null?weather.wind:""}</td><td>${weather?.windDir||""}</td>
  </tr>`).join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:Arial,sans-serif;font-size:10px;margin:16px;color:#000}
    h2{text-align:center;font-size:13px;margin-bottom:3px}
    h3{text-align:center;font-size:11px;margin:0 0 10px;font-weight:normal}
    table{width:100%;border-collapse:collapse}
    th,td{border:1px solid #333;padding:4px 6px;text-align:left;vertical-align:top}
    th{background:#ddd;font-weight:bold}
    .sig{margin-top:32px}.sig-line{border-top:1px solid #000;width:260px;display:inline-block}
  </style></head><body>
  <h2>Maintenance Log</h2>
  <h3>City of Tulsa / Stormwater Maintenance Division — ${listName}</h3>
  <table><thead><tr>
    <th>DATE</th><th>NAME</th><th>ADDRESS</th><th>MILES</th><th>LINEAR FT</th>
    <th>START</th><th>END</th><th>SKY</th><th>TEMP °F</th><th>WIND</th><th>DIR</th>
  </tr></thead><tbody>${rows}</tbody></table>
  <p class="sig">Applicator Signature: <span class="sig-line"></span></p>
  <p>Notes: _______________________________________________</p>
  </body></html>`;
}

function pesticideHTML(job, weather, chem) {
  const f = (label, val, full) =>
    `<div class="field${full?' full':''}"><label>${label}</label><span>${val||""}</span></div>`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:Arial,sans-serif;font-size:11px;margin:28px 32px;color:#000}
    h2{text-align:center;font-size:15px;font-weight:bold;letter-spacing:1px;margin-bottom:2px}
    h3{text-align:center;font-size:12px;margin:0 0 16px}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 20px;margin-bottom:8px}
    .field{display:flex;flex-direction:column}
    .field label{font-weight:bold;font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#444}
    .field span{border-bottom:1px solid #888;padding:2px 0;min-height:18px;font-size:12px}
    .full{grid-column:1/-1}
    .sig-line{border-top:1px solid #000;margin-top:48px;width:300px;display:inline-block}
    hr{border:none;border-top:1px solid #ccc;margin:10px 0}
  </style></head><body>
  <h2>Pesticide Application Record</h2>
  <h3>City of Tulsa / Stormwater Maintenance Division</h3><hr/>
  <div class="grid">
    ${f("Date",job.date)} ${f("Time",job.timeStart)}
    ${f("Location",job.address,true)}
    ${f("Acres Treated",job.acreage||job.miles)} ${f("Target Species","Noxious Vegetation")}
    ${f("Pesticide Applied",chem.pesticide)} ${f("Trade Name",chem.tradeName)}
    ${f("Manufacturer",chem.manufacturer)} ${f("Tank Mix Concentration",chem.tankConc)}
    ${f("Gallons of Mixture",chem.gallonsMixture)} ${f("EPA Reg No.",chem.epaReg)}
    ${f("EPA Est No.",chem.epaEst)} ${f("Type of Applicator",chem.applicatorType)}
    ${f("Rate of Application",chem.ratePerAcre)} ${f("Amount Applied",chem.amountApplied)}
    ${f("Rate of Carrier",chem.rateCarrier)}
  </div><hr/>
  <div class="grid">
    ${f("Weather Conditions",weather?.sky)} ${f("Temperature °F",weather?.temp)}
    ${f("Wind Speed (mph)",weather?.wind)} ${f("Wind Direction",weather?.windDir)}
  </div><hr/>
  <p>Applicator Signature: <span class="sig-line"></span></p>
  <p>Notes: _______________________________________________</p>
  </body></html>`;
}

function openPrint(html) {
  const w = window.open("","_blank");
  if (!w) { alert("Allow pop-ups to print."); return; }
  w.document.write(html); w.document.close(); w.focus();
  setTimeout(() => w.print(), 600);
}

// ── Shared components ─────────────────────────────────────────────────────────
function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{display:"flex",borderBottom:"2px solid #2d5a1b",marginBottom:24,gap:2,flexWrap:"wrap"}}>
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)} style={{
          padding:"8px 18px", border:"none", fontSize:13,
          fontWeight: active===t ? 700 : 400,
          background: active===t ? "#2d5a1b" : "#e8f0e2",
          color: active===t ? "#fff" : "#2d5a1b",
          borderRadius:"6px 6px 0 0"
        }}>{t}</button>
      ))}
    </div>
  );
}

function ListPicker({ value, onChange, counts }) {
  return (
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {LISTS.map(l => (
        <button key={l} onClick={() => onChange(l)} style={{
          padding:"6px 14px", border:"1.5px solid #2d5a1b", borderRadius:5,
          background: value===l ? "#2d5a1b" : "#fff",
          color: value===l ? "#fff" : "#2d5a1b",
          fontWeight: value===l ? 700 : 400, fontSize:12
        }}>{l}{counts ? ` (${counts[l]||0})` : ""}</button>
      ))}
    </div>
  );
}

function WeatherBox({ weather }) {
  if (!weather) return null;
  const icon = weather.sky==="Clear" ? "☀️" : weather.sky==="Partly Cloudy" ? "⛅" : "☁️";
  return (
    <div style={{background:"#e8f0e2",border:"1px solid #b5d4a0",borderRadius:7,padding:"10px 14px",marginBottom:14}}>
      <div style={{fontSize:11,fontWeight:700,color:"#2d5a1b",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Weather Conditions</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 12px",fontSize:13}}>
        <div><span style={{color:"#888",fontSize:11,display:"block"}}>Sky</span><strong>{icon} {weather.sky}</strong></div>
        <div><span style={{color:"#888",fontSize:11,display:"block"}}>Temp</span><strong>{weather.temp}°F</strong></div>
        <div><span style={{color:"#888",fontSize:11,display:"block"}}>Wind</span><strong>{weather.wind} mph</strong></div>
        <div><span style={{color:"#888",fontSize:11,display:"block"}}>Direction</span><strong>{weather.windDir}</strong></div>
      </div>
    </div>
  );
}


// ── Jobs Tab ──────────────────────────────────────────────────────────────────
const EMPTY_PENDING = Object.fromEntries(LISTS.map(l => [l, []]));

function JobsTab({ jobLists, chemDefaults, completedLogs, setCompletedLogs }) {
  const [listName, setListName]     = useState(LISTS[0]);
  const [search, setSearch]         = useState("");
  const [panel, setPanel]           = useState(null);
  // Single object keyed by list name — fixes stale-pending bug when switching lists
  const [allPending, setAllPending] = useLS("spraylog_pending2", EMPTY_PENDING);
  const [showLabel, setShowLabel]   = useState(false);
  const [batchLabel, setBatchLabel] = useState("");
  const [lastDate, setLastDate]     = useState(
    () => localStorage.getItem("spraylog_lastDate") || new Date().toISOString().slice(0,10)
  );

  const pending    = allPending[listName] || [];
  const setPending = useCallback(updater => {
    setAllPending(prev => {
      const next = typeof updater === 'function' ? updater(prev[listName]||[]) : updater;
      const updated = {...prev, [listName]: next};
      api.put("/api/pending/"+encodeURIComponent(listName), next);
      return updated;
    });
  }, [listName, setAllPending]);

  const jobs     = jobLists[listName]||[];
  const isTAC100 = listName==="TAC 100";

  // Build a set of job names already committed to a saved log for this list
  const loggedNames = new Set(
    completedLogs
      .filter(log => log.listName === listName)
      .flatMap(log => log.entries?.map(e => e.job.name) || [])
  );

  const pendingIdxs = new Set(pending.map(e => e.jobIdx));
  const unlogged = jobs.filter((j, idx) => !loggedNames.has(j.name) && !pendingIdxs.has(idx));

  const searchLower = search.toLowerCase();
  const filtered = search.trim()
    ? unlogged.filter(j =>
        j.name?.toLowerCase().includes(searchLower) ||
        j.code?.toLowerCase().includes(searchLower) ||
        j.address?.toLowerCase().includes(searchLower))
    : unlogged;

  const sorted = [...pending].sort((a,b) => a.jobIdx - b.jobIdx);

  const openJob = idx => {
    if (panel?.jobIdx===idx) { setPanel(null); return; }
    setPanel({ jobIdx:idx, date:lastDate, timeRaw:"", timeStart:"", timeEnd:"", weather:null, status:"", loading:false });
  };

  const doFetch = async () => {
    if (!panel.timeStart || !panel.date) {
      setPanel(p => ({...p, status:"⚠️ Enter a start time first"}));
      return;
    }
    setLastDate(panel.date);
    localStorage.setItem("spraylog_lastDate", panel.date);
    setPanel(p => ({...p, loading:true, weather:null, status:"Locating address…"}));
    try {
      const job = jobs[panel.jobIdx];
      const { lat, lon } = await geocode(job.address);
      setPanel(p => ({...p, status:"Fetching weather…"}));
      const weather = await getWeather(lat, lon, panel.date, panel.timeStart);
      setPanel(p => ({...p, loading:false, weather, status:""}));
    } catch(e) {
      setPanel(p => ({...p, loading:false, status:"❌ "+e.message}));
    }
  };

  const doAdd = () => {
    const job = { ...jobs[panel.jobIdx], date:panel.date, timeStart:panel.timeStart, timeEnd:panel.timeEnd };
    setPending(prev => {
      const rest = prev.filter(e => e.jobIdx !== panel.jobIdx);
      return [...rest, { jobIdx:panel.jobIdx, job, weather:panel.weather }];
    });
    setPanel(p => ({...p, status:"✅ Added to log"}));
  };

  const removeFromPending = jobIdx => setPending(prev => prev.filter(e => e.jobIdx!==jobIdx));

  const doConfirmPrint = label => {
    setShowLabel(false);
    const chem = chemDefaults[listName]||DEFAULT_CHEM[listName];
    openPrint(trailsHTML(sorted.map(e => ({job:e.job,weather:e.weather})), listName));
    if (isTAC100) {
      sorted.forEach((e,i) => {
        setTimeout(() => openPrint(pesticideHTML(e.job, e.weather, chem)), 800 + i*800);
      });
    }
    const batch = {
      id: Date.now(), isBatch: true, label: label || listName, listName, chem,
      entries: sorted.map(e => ({ job:e.job, weather:e.weather })),
      createdAt: new Date().toLocaleString(),
    };
    setCompletedLogs([batch, ...completedLogs]);
    setPending([]);
    setBatchLabel("");
  };

  // Show remaining (unlogged) count on each list button
  const counts = Object.fromEntries(LISTS.map(l => {
    const all = jobLists[l]||[];
    const doneNames = new Set(
      completedLogs.filter(log => log.listName === l).flatMap(log => log.entries?.map(e => e.job.name) || [])
    );
    return [l, all.filter(j => !doneNames.has(j.name)).length];
  }));

  return (
    <div>
      <div style={{marginBottom:16}}>
        <ListPicker value={listName} onChange={l => { setListName(l); setPanel(null); setSearch(""); }} counts={counts} />
      </div>

      {pending.length > 0 && (
        <div style={{background:"#e8f0e2",border:"1px solid #b5d4a0",borderRadius:8,padding:"10px 14px",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontWeight:700,fontSize:13,color:"#2d5a1b"}}>{pending.length} job{pending.length!==1?"s":""} in log</span>
            <button onClick={() => sorted.length && setShowLabel(true)} style={{padding:"7px 18px",background:"#1a3d6e",color:"#fff",border:"none",borderRadius:6,fontSize:12,fontWeight:700}}>
              🖨 Print {isTAC100 ? "Log + Application Records" : "Log"}
            </button>
          </div>

          {showLabel && (
            <div style={{background:"#fff",border:"1px solid #b5d4a0",borderRadius:7,padding:"12px 14px",marginBottom:8}}>
              <div style={{fontSize:12,fontWeight:700,color:"#2d5a1b",marginBottom:8}}>Name this batch (e.g. "June Trails")</div>
              <div style={{display:"flex",gap:8}}>
                <input value={batchLabel} onChange={e => setBatchLabel(e.target.value)}
                  onKeyDown={e => { if(e.key==="Enter") doConfirmPrint(batchLabel); }}
                  placeholder={`e.g. June ${listName}`} autoFocus
                  style={{flex:1,padding:"7px 10px",border:"1px solid #bbb",borderRadius:5,fontSize:13}} />
                <button onClick={() => doConfirmPrint(batchLabel)} style={{padding:"7px 16px",background:"#1a3d6e",color:"#fff",border:"none",borderRadius:5,fontSize:12,fontWeight:700}}>Print & Save</button>
                <button onClick={() => setShowLabel(false)} style={{padding:"7px 10px",background:"none",border:"1px solid #ddd",borderRadius:5,fontSize:12,color:"#aaa"}}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {sorted.map(e => (
              <div key={e.jobIdx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#fff",borderRadius:5,padding:"6px 10px",fontSize:12}}>
                <div>
                  <strong>{e.job.name}</strong>
                  <span style={{color:"#888",marginLeft:8}}>{e.job.timeStart}{e.job.timeEnd ? ` – ${e.job.timeEnd}` : ""}</span>
                  <span style={{marginLeft:8,fontSize:11,color:"#2d5a1b"}}>
                    {e.weather?.sky==="Clear"?"☀️":e.weather?.sky==="Partly Cloudy"?"⛅":"☁️"} {e.weather?.temp}°F · {e.weather?.wind}mph {e.weather?.windDir}
                  </span>
                </div>
                <button onClick={() => removeFromPending(e.jobIdx)} style={{background:"none",border:"none",color:"#c0392b",fontSize:13,padding:"0 4px"}}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {jobs.length===0 ? (
        <div style={{padding:40,textAlign:"center",color:"#aaa",border:"2px dashed #ddd",borderRadius:10}}>
          <div style={{fontSize:32,marginBottom:8}}>📋</div>
          <div style={{fontWeight:600,marginBottom:4}}>No jobs in {listName}</div>
          <div style={{fontSize:12}}>No jobs loaded for this list</div>
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:panel?"1fr 340px":"1fr",gap:16,alignItems:"start"}}>
          <div>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, code, or address…"
              style={{width:"100%",padding:"8px 12px",border:"1px solid #ccc",borderRadius:7,fontSize:13,marginBottom:8}} />
            <div style={{fontSize:11,color:"#aaa",marginBottom:6}}>
              {filtered.length} remaining{loggedNames.size > 0 ? ` · ${loggedNames.size} logged` : ""} · click to log
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4,maxHeight:520,overflowY:"auto",paddingRight:4}}>
              {filtered.map((job, fi) => {
                const idx      = jobs.indexOf(job);
                const isActive = panel?.jobIdx===idx;
                const inLog    = pending.some(e => e.jobIdx===idx);
                return (
                  <div key={idx} onClick={() => openJob(idx)} style={{
                    padding:"10px 14px", borderRadius:7, cursor:"pointer",
                    border:`1.5px solid ${isActive?"#2d5a1b":inLog?"#b5d4a0":"#e0e0e0"}`,
                    background: isActive?"#2d5a1b":inLog?"#f4faf0":"#fff",
                  }}>
                    <div style={{fontWeight:600,fontSize:13,color:isActive?"#fff":"#1a1a1a"}}>{job.name}</div>
                    <div style={{fontSize:11,color:isActive?"#b5d4a0":"#999",marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {job.address}{job.miles?` · ${job.miles} mi`:""}{job.acreage?` · ${job.acreage} ac`:""}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {panel && (() => {
            const job = jobs[panel.jobIdx];
            const canFetch = !!panel.timeStart && !!panel.date && !panel.loading;
            return (
              <div style={{border:"2px solid #2d5a1b",borderRadius:10,padding:18,background:"#f9fcf7",position:"sticky",top:16}}>
                <div style={{fontWeight:700,fontSize:15,color:"#2d5a1b",marginBottom:2}}>{job.name}</div>
                <div style={{fontSize:12,color:"#777",marginBottom:14}}>{job.address}</div>

                <div style={{marginBottom:10}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:.4,marginBottom:4}}>Date</div>
                  <input type="date" value={panel.date}
                    onChange={e => {
                      setLastDate(e.target.value);
                      localStorage.setItem("spraylog_lastDate", e.target.value);
                      setPanel(p => ({...p, date:e.target.value, weather:null, status:""}));
                    }}
                    style={{width:"100%",padding:"7px 10px",border:"1px solid #bbb",borderRadius:5,fontSize:13}} />
                </div>

                <div style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:.4,marginBottom:4}}>
                    Time &nbsp;<span style={{fontSize:10,color:"#aaa",fontWeight:400}}>e.g. 10:49 AM - 11:30 AM · Enter to fetch</span>
                  </div>
                  <input value={panel.timeRaw||""} placeholder="10:49 AM - 11:30 AM"
                    onChange={e => {
                      const raw = e.target.value;
                      const { start, end } = parseTimeInput(raw);
                      setPanel(p => ({...p, timeRaw:raw, timeStart:start, timeEnd:end, weather:null, status:""}));
                    }}
                    onKeyDown={e => { if(e.key==="Enter") doFetch(); }}
                    style={{width:"100%",padding:"7px 10px",border:"1px solid #bbb",borderRadius:5,fontSize:13}} />
                </div>

                {panel.loading && <div style={{textAlign:"center",padding:"10px 0",fontSize:13,color:"#888",fontStyle:"italic"}}>{panel.status||"Working…"}</div>}
                {!panel.loading && panel.status && (
                  <p style={{fontSize:12,margin:"0 0 12px",color:panel.status.startsWith("✅")?"#2d5a1b":"#c0392b"}}>{panel.status}</p>
                )}

                {panel.weather && <WeatherBox weather={panel.weather} />}

                {!panel.weather && !panel.loading && (
                  <button onClick={doFetch} disabled={!canFetch} style={{
                    width:"100%",padding:"10px",marginBottom:8,
                    background:canFetch?"#2d5a1b":"#ccc",color:"#fff",border:"none",borderRadius:7,
                    fontSize:13,fontWeight:600,cursor:canFetch?"pointer":"not-allowed"
                  }}>⛅ Fetch Weather</button>
                )}

                {panel.weather && !panel.loading && (
                  <button onClick={doFetch} style={{width:"100%",padding:"6px",marginBottom:8,background:"none",border:"1px solid #b5d4a0",borderRadius:6,fontSize:11,color:"#2d5a1b"}}>↺ Re-fetch weather</button>
                )}

                {panel.weather && (
                  <button onClick={doAdd} style={{width:"100%",padding:"11px",background:"#2d5a1b",color:"#fff",border:"none",borderRadius:7,fontSize:13,fontWeight:700,letterSpacing:.3}}>
                    + Add to Log
                  </button>
                )}

                <button onClick={() => setPanel(null)} style={{width:"100%",marginTop:10,padding:"7px",background:"none",border:"1px solid #ddd",borderRadius:7,fontSize:12,color:"#aaa"}}>✕ Close</button>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// ── Saved Logs Tab ────────────────────────────────────────────────────────────
function LogsTab({ completedLogs, setCompletedLogs }) {
  const [filter, setFilter]     = useState("All");
  const [expanded, setExpanded] = useState({});
  const shown = filter==="All" ? completedLogs : completedLogs.filter(l => l.listName===filter);

  const toggle = id => setExpanded(e => ({...e, [id]:!e[id]}));

  const reprintBatch = log => {
    const chem = log.chem || DEFAULT_CHEM[log.listName];
    openPrint(trailsHTML(log.entries, log.listName));
    if (log.listName==="TAC 100") {
      log.entries.forEach((e,i) => {
        setTimeout(() => openPrint(pesticideHTML(e.job, e.weather, chem)), 800 + i*800);
      });
    }
  };

  return (
    <div>
      <h3 style={{color:"#2d5a1b",marginTop:0}}>Saved Logs ({completedLogs.length})</h3>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {["All",...LISTS].map(l => (
          <button key={l} onClick={() => setFilter(l)} style={{
            padding:"5px 12px", border:"1.5px solid #2d5a1b", borderRadius:5,
            background:filter===l?"#2d5a1b":"#fff", color:filter===l?"#fff":"#2d5a1b",
            fontWeight:filter===l?700:400, fontSize:12
          }}>{l}</button>
        ))}
      </div>
      {shown.length===0 && <p style={{color:"#aaa",fontSize:13}}>No logs saved yet.</p>}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {shown.map(log => (
          <div key={log.id} style={{border:"1px solid #ddd",borderRadius:8,background:"#fff",overflow:"hidden"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",gap:12}}>
              <div style={{flex:1,cursor:"pointer"}} onClick={() => toggle(log.id)}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <strong style={{fontSize:14}}>{log.isBatch ? log.label : log.job?.name}</strong>
                  <span style={{fontSize:11,background:"#e8f0e2",color:"#2d5a1b",padding:"2px 7px",borderRadius:10,fontWeight:700}}>{log.listName}</span>
                  {log.isBatch && <span style={{fontSize:11,color:"#888"}}>{log.entries?.length} jobs</span>}
                </div>
                <div style={{fontSize:12,color:"#888",marginTop:3}}>{log.createdAt}</div>
                {log.isBatch && <div style={{fontSize:11,color:"#aaa",marginTop:2}}>{expanded[log.id]?"▲ Hide":"▼ Show"} jobs</div>}
              </div>
              <div style={{display:"flex",gap:6,flexShrink:0,alignItems:"center"}}>
                {log.isBatch ? (
                  <button onClick={() => reprintBatch(log)} style={{padding:"5px 10px",background:"#2d5a1b",color:"#fff",border:"none",borderRadius:5,fontSize:11}}>🖨 Reprint</button>
                ) : (
                  <>
                    <button onClick={() => openPrint(trailsHTML([{job:log.job,weather:log.weather}],log.listName))} style={{padding:"5px 10px",background:"#2d5a1b",color:"#fff",border:"none",borderRadius:5,fontSize:11}}>Log</button>
                    {log.listName==="TAC 100" && (
                      <button onClick={() => openPrint(pesticideHTML(log.job,log.weather,log.chem||DEFAULT_CHEM[log.listName]))} style={{padding:"5px 10px",background:"#1a3d6e",color:"#fff",border:"none",borderRadius:5,fontSize:11}}>Application</button>
                    )}
                  </>
                )}
                <button onClick={() => { if(confirm("Delete?")) setCompletedLogs(completedLogs.filter(l => l.id!==log.id)); }}
                  style={{padding:"5px 8px",background:"none",color:"#c0392b",border:"1px solid #e0c0c0",borderRadius:5,fontSize:11}}>✕</button>
              </div>
            </div>
            {log.isBatch && expanded[log.id] && (
              <div style={{borderTop:"1px solid #f0f0f0",padding:"8px 16px 12px"}}>
                {log.entries?.map((e,i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid #f5f5f5",fontSize:12}}>
                    <div>
                      <strong>{e.job.name}</strong>
                      <span style={{color:"#888",marginLeft:8}}>{e.job.date} · {e.job.timeStart}{e.job.timeEnd?` – ${e.job.timeEnd}`:""}</span>
                    </div>
                    <span style={{fontSize:11,color:"#2d5a1b"}}>
                      {e.weather?.sky==="Clear"?"☀️":e.weather?.sky==="Partly Cloudy"?"⛅":"☁️"} {e.weather?.temp}°F · {e.weather?.wind}mph {e.weather?.windDir}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Chemicals Tab ─────────────────────────────────────────────────────────────
function ChemTab({ chemDefaults, setChemDefaults }) {
  const [listName, setListName] = useState("TAC 100");
  const chem   = chemDefaults[listName]||DEFAULT_CHEM[listName];
  const update = (f,v) => setChemDefaults({...chemDefaults,[listName]:{...chem,[f]:v}});
  const fields = [
    ["pesticide","Pesticide Applied"],["tradeName","Trade Name"],["manufacturer","Manufacturer"],
    ["tankConc","Tank Mix Concentration"],["epaReg","EPA Reg No."],["epaEst","EPA Est No."],
    ["applicatorType","Type of Applicator"],["ratePerAcre","Rate of Application (per acre)"],
    ["gallonsMixture","Gallons of Mixture"],["amountApplied","Amount Applied"],["rateCarrier","Rate of Carrier"],
  ];
  return (
    <div>
      <h3 style={{color:"#2d5a1b",marginTop:0}}>Chemical Defaults</h3>
      <p style={{fontSize:13,color:"#666",marginTop:0}}>TAC 100 uses these for the Pesticide Application Record.</p>
      <div style={{marginBottom:20}}><ListPicker value={listName} onChange={setListName} /></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
        {fields.map(([key,label]) => (
          <div key={key} style={{display:"flex",flexDirection:"column",gap:3,marginBottom:12}}>
            <label style={{fontSize:11,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:.4}}>{label}</label>
            <input value={chem[key]||""} onChange={e => update(key,e.target.value)}
              style={{padding:"7px 10px",border:"1px solid #bbb",borderRadius:5,fontSize:13}} />
          </div>
        ))}
      </div>
      <p style={{fontSize:12,color:"#2d5a1b"}}>✅ Saves automatically.</p>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [tab, setTab]                     = useState("Jobs");
  const [ready, setReady]                 = useState(false);
  const [jobLists, setJobLists]           = useLS("spraylog_jobs",  {"TAC 100":TAC_100_JOBS,"TAC 295 Big Spray":TAC_295_BIG_ACQUISITION_LOTS,[LISTS[2]]:[],[LISTS[3]]:[]}, "/api/job-lists");
  const [chemDefaults, setChemDefaults]   = useLS("spraylog_chem",  DEFAULT_CHEM, "/api/chem-defaults");
  const [completedLogs, setCompletedLogs] = useLS("spraylog_logs",  [], "/api/logs");
  const totalJobs = Object.values(jobLists).flat().length;

  useEffect(() => {
    api.get('/api/all').then(data => {
      if (data) {
        if (data.chemDefaults && Object.keys(data.chemDefaults).length) setChemDefaults(data.chemDefaults);
        if (data.logs?.length)                                          setCompletedLogs(data.logs);
        // Always use hard-coded TAC 100; merge other lists from server
        if (data.jobLists) {
          setJobLists(prev => ({ ...data.jobLists, "TAC 100": TAC_100_JOBS, "TAC 295 Big Spray": TAC_295_BIG_ACQUISITION_LOTS }));
        }
      }
      setReady(true);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) return (
    <div style={{minHeight:"100vh",background:"#f2f5ee",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif",color:"#2d5a1b",fontSize:15}}>
      Loading…
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#f2f5ee",fontFamily:"Georgia,serif"}}>
      <div style={{background:"#2d5a1b",padding:"14px 28px",display:"flex",alignItems:"center",gap:14}}>
        <span style={{fontSize:26}}>🌿</span>
        <div>
          <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Spray Log Generator</div>
          <div style={{color:"#b5d4a0",fontSize:11}}>City of Tulsa / Stormwater Maintenance — Hydromulch Plus of Oklahoma</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:16,fontSize:12,color:"#b5d4a0"}}>
          <span>📋 {totalJobs} jobs</span>
          <span>📄 {completedLogs.length} saved</span>
        </div>
      </div>
      <div style={{maxWidth:980,margin:"24px auto",padding:"0 16px"}}>
        <Tabs tabs={["Jobs","Saved Logs","Chemicals"]} active={tab} onChange={setTab} />
        <div style={{background:"#fff",borderRadius:10,padding:26,boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}>
          {tab==="Jobs"       && <JobsTab jobLists={jobLists} chemDefaults={chemDefaults} completedLogs={completedLogs} setCompletedLogs={setCompletedLogs} />}
          {tab==="Saved Logs" && <LogsTab completedLogs={completedLogs} setCompletedLogs={setCompletedLogs} />}
          {tab==="Chemicals"  && <ChemTab chemDefaults={chemDefaults} setChemDefaults={setChemDefaults} />}
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App/>);
