with open("src/pages/QuizDashboard.tsx", "r") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "import React, { useMemo, useState } from 'react';" in line:
        pass # remove it
    elif "import { useState, useMemo, useEffect } from 'react';" in line:
        new_lines.append(line)
    else:
        new_lines.append(line)

with open("src/pages/QuizDashboard.tsx", "w") as f:
    f.writelines(new_lines)
