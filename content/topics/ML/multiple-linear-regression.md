# Multiple Linear Regression

**TOPIC:** Multiple Linear Regression  
**PREREQUISITE TOPICS:** Simple Linear Regression, Matrix Addition & Multiplication, Systems of Linear Equations  
**LEARNING OUTCOMES:** Formulate the multiple linear regression equation in vector and matrix forms, solve parameter coefficients using the normal equation, understand multicollinearity, and interpret partial regression coefficients.

## 1. CORE CONCEPT

Multiple Linear Regression (MLR) extends Simple Linear Regression by modeling the relationship between a single continuous outcome variable and two or more predictor features simultaneously.

Imagine trying to estimate the market price of a house. Looking solely at square footage gives a rough trend, but real-world pricing depends on multiple factors at once: floor area, number of bedrooms, and building age. Rather than fitting a single 2D line across one feature, Multiple Linear Regression fits a multidimensional **hyperplane** across all features at the same time.

In a 3D space with two input features (e.g., size and bedrooms) and one target (price), the model is no longer a 1D line on a flat chart—it is a 2D flat plane suspended inside a 3D room, positioned to minimize the vertical distances to all data points scattered in that 3D space.

Each feature gets its own dedicated coefficient, known as a **partial regression coefficient**. This coefficient represents the expected change in the target variable when that specific feature increases by one unit, while holding all other features strictly constant.

The key insight: Multiple Linear Regression isolates the unique contribution of each feature on the target output while mathematically controlling for the confounding influence of all other features.

## 2. THE PROBLEM IT SOLVES

Suppose a university wants to predict a graduate's starting salary based on their GPA. 

If you use **Simple Linear Regression**, you might find that higher GPAs predict higher salaries. However, this simple view ignores critical variables like years of work experience or field of study. If students with high GPAs also happen to have more internship experience, a single-variable model incorrectly attributes all salary gains to GPA alone.

Running separate simple linear regressions for each variable is equally problematic because it fails to capture how features overlap or interact.

Multiple Linear Regression solves this by putting all relevant variables into a single unified equation. It disentangles overlapping effects, allowing you to answer questions like: *"How much extra salary does 1 additional GPA point provide for two candidates who have the exact same years of experience?"*

## 3. FORMAL DEFINITION & NOTATION

For an observation with $p$ independent features $(x_1, x_2, \dots, x_p)$, Multiple Linear Regression models the target $y$ as:

$$\hat{y}_i = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \dots + \beta_p x_{ip}$$

In compact matrix notation for $n$ observations:

$$\mathbf{\hat{y}} = \mathbf{X}\boldsymbol{\beta}$$

Where $\mathbf{X}$ is an $n \times (p+1)$ matrix containing a leading column of $1\text{s}$ for the intercept term $\beta_0$.

| Symbol | Meaning | Example / Dimensions |
|---|---|---|
| $\mathbf{X}$ | Feature matrix (with bias column) | $n \times (p+1)$ matrix |
| $\boldsymbol{\beta}$ | Coefficient parameter vector | $(p+1) \times 1$ vector ($\beta_0, \beta_1, \dots, \beta_p$) |
| $x_{ij}$ | Value of feature $j$ for instance $i$ | $x_{1,2} = 3\text{ bedrooms}$ |
| $\hat{y}_i$ | Predicted continuous target | Predicted salary ($\$75,000$) |
| $\mathbf{X}^T$ | Transpose of feature matrix $\mathbf{X}$ | $(p+1) \times n$ matrix |

Using Ordinary Least Squares (OLS), we minimize the Sum of Squared Errors $S(\boldsymbol{\beta}) = (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T(\mathbf{y} - \mathbf{X}\boldsymbol{\beta})$. Setting derivatives to zero yields the closed-form **Normal Equation**:

$$\boldsymbol{\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$$

## 4. INTUITION WITH VISUALS

Picture a 3D glass box representing a dataset with $p = 2$ features and target $y$.

The floor of the box represents the two inputs: the horizontal $x_1$-axis is study hours, and the depth $x_2$-axis is class attendance rate ($0\%$ to $100\%$). The vertical height $y$-axis represents final exam marks.

Every student is a floating sphere suspended inside this 3D space. If students who study more and attend more classes score higher, the spheres float higher near the far corner of the box.

Instead of drawing a straight 1D line, Multiple Linear Regression inserts a flat, rigid 2D sheet (a plane) slicing diagonally through the glass box. From each floating sphere, imagine dropping a vertical string straight down or up to touch the sheet. 

OLS rotates and tilts this 2D sheet until the sum of the squared lengths of all vertical strings reaches the smallest possible value.

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Fit a Multiple Linear Regression model $\hat{y} = \beta_0 + \beta_1 x_1 + \beta_2 x_2$ using OLS for a dataset with $n=3$ observations and $p=2$ features ($x_1$: Study hours, $x_2$: Practice tests taken, $y$: Exam score).

**Given:**  
- Student 1: $(x_{11}, x_{12}, y_1) = (1, 1, 6)$
- Student 2: $(x_{21}, x_{22}, y_2) = (2, 0, 5)$
- Student 3: $(x_{31}, x_{32}, y_3) = (3, 2, 13)$

**Solution steps:**

01. **Construct the Normal Equations system:**  
    The system of normal equations for OLS with 2 features is:
    $$\sum y = n\beta_0 + \beta_1 \sum x_1 + \beta_2 \sum x_2$$
    $$\sum x_1 y = \beta_0 \sum x_1 + \beta_1 \sum x_1^2 + \beta_2 \sum x_1 x_2$$
    $$\sum x_2 y = \beta_0 \sum x_2 + \beta_1 \sum x_1 x_2 + \beta_2 \sum x_2^2$$

02. **Calculate the necessary summations:**  
    - $n = 3$
    - $\sum y = 6 + 5 + 13 = 24$
    - $\sum x_1 = 1 + 2 + 3 = 6$
    - $\sum x_2 = 1 + 0 + 2 = 3$
    - $\sum x_1^2 = 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14$
    - $\sum x_2^2 = 1^2 + 0^2 + 2^2 = 1 + 0 + 4 = 5$
    - $\sum x_1 x_2 = (1)(1) + (2)(0) + (3)(2) = 1 + 0 + 6 = 7$
    - $\sum x_1 y = (1)(6) + (2)(5) + (3)(13) = 6 + 10 + 39 = 55$
    - $\sum x_2 y = (1)(6) + (0)(5) + (2)(13) = 6 + 0 + 26 = 32$

03. **Write down the linear system:**  
    $$\text{(Eq 1): } 3\beta_0 + 6\beta_1 + 3\beta_2 = 24 \implies \beta_0 + 2\beta_1 + \beta_2 = 8$$
    $$\text{(Eq 2): } 6\beta_0 + 14\beta_1 + 7\beta_2 = 55$$
    $$\text{(Eq 3): } 3\beta_0 + 7\beta_1 + 5\beta_2 = 32$$

04. **Solve the system step-by-step:**  
    - From (Eq 1): $\beta_0 = 8 - 2\beta_1 - \beta_2$
    - Substitute $\beta_0$ into (Eq 3):
      $$3(8 - 2\beta_1 - \beta_2) + 7\beta_1 + 5\beta_2 = 32$$
      $$24 - 6\beta_1 - 3\beta_2 + 7\beta_1 + 5\beta_2 = 32 \implies \beta_1 + 2\beta_2 = 8 \implies \beta_1 = 8 - 2\beta_2$$
    - Substitute $\beta_0$ and $\beta_1$ into (Eq 2):
      $$6(8 - 2\beta_1 - \beta_2) + 14\beta_1 + 7\beta_2 = 55$$
      $$48 + 2\beta_1 + \beta_2 = 55 \implies 2(8 - 2\beta_2) + \beta_2 = 7$$
      $$16 - 4\beta_2 + \beta_2 = 7 \implies -3\beta_2 = -9 \implies \beta_2 = 3$$
    - Solve remaining coefficients:
      $$\beta_1 = 8 - 2(3) = 2$$
      $$\beta_0 = 8 - 2(2) - 3 = 1$$

05. **State final fitted model:**
    $$\hat{y} = 1 + 2 x_1 + 3 x_2$$

**Answer:**  
The fitted regression model is $\hat{y} = 1 + 2x_1 + 3x_2$. Base score is $1$, each study hour adds $2$ marks, and each practice test adds $3$ marks.

## 6. WORKED EXAMPLE 2: Common Variation

**Problem:**  
Demonstrate prediction and residual computation for a new observation using a fitted multiple linear regression model with negative and positive coefficients.

**Given:**  
A fitted model predicting car fuel efficiency ($y$ in miles per gallon) from weight ($x_1$ in 1,000 lbs) and engine horsepower ($x_2$ in 100 hp):
$$\hat{y} = 45 - 6.0 x_1 - 2.5 x_2$$

Evaluate a test car with specs $x_1 = 3.0$ (3,000 lbs) and $x_2 = 1.5$ (150 hp) that has an actual observed mpg $y = 18.0$.

**Solution steps:**

01. **Identify feature inputs and actual target:**
    - Weight feature $x_1 = 3.0$
    - Horsepower feature $x_2 = 1.5$
    - Actual MPG $y = 18.0$

02. **Substitute feature values into the fitted model equation:**
    $$\hat{y} = 45 - 6.0(3.0) - 2.5(1.5)$$

03. **Perform step-by-step arithmetic:**
    - Base intercept: $45$
    - Weight penalty: $-6.0 \times 3.0 = -18.0$
    - Horsepower penalty: $-2.5 \times 1.5 = -3.75$
    $$\hat{y} = 45 - 18.0 - 3.75 = 23.25\text{ mpg}$$

04. **Calculate residual error ($e = y - \hat{y}$):**
    $$e = 18.0 - 23.25 = -5.25\text{ mpg}$$

05. **Interpret the results:**
    - The model predicted $23.25\text{ mpg}$.
    - The negative residual ($-5.25$) shows the car performs $5.25\text{ mpg}$ worse than predicted given its weight and horsepower.
    - Highlight: Notice how $x_1$ and $x_2$ both carry negative coefficients, capturing how adding weight or increasing engine power simultaneously lowers fuel economy.

**Answer:**  
Predicted MPG is $23.25\text{ mpg}$ with a residual error of $-5.25\text{ mpg}$.

## 7. COMMON MISTAKES

❌ **MISTAKE:** Including two highly correlated features (e.g., house size in sq ft and sq meters) in the same model without addressing **multicollinearity**.  
✅ **FIX:** Remove one of the redundant features or use regularization techniques like Ridge Regression.  
**WHY:** When two features are collinear, $(\mathbf{X}^T\mathbf{X})$ becomes near-singular (non-invertible), causing coefficient estimates to wildly fluctuate with extreme variance.

❌ **MISTAKE:** Interpreting $\beta_1$ as a simple overall effect without acknowledging the other features in the model.  
✅ **FIX:** Always frame $\beta_j$ as a *partial* coefficient: the impact of $x_j$ *holding all other variables constant*.  
**WHY:** Adding or removing a feature changes the numerical value and meaning of all other coefficients in MLR.

## 8. WHEN TO USE (vs. When NOT to Use)

**When to Use:**
- You have multiple continuous or dummy-encoded categorical predictors driving a single continuous output.
- Relationships between predictors and target are reasonably linear.
- You need clear interpretability to measure the isolated effect of each variable.

**When NOT to Use:**
- The number of features $p$ exceeds the number of observations $n$ ($p > n$), as $(\mathbf{X}^T\mathbf{X})^{-1}$ cannot be computed.
- Predictors exhibit severe multicollinearity (high pairwise or cross-feature correlations).
- Features interact non-linearly without explicit interaction terms or non-linear transformers.

**The Boundary:**  
Check the Variance Inflation Factor (VIF) for each feature. If $\text{VIF} > 10$, severe multicollinearity is present and OLS assumptions break down; you must drop features or switch to regularized regression.

## 9. CONNECTIONS TO OTHER TOPICS

**Builds on:**
- **Simple Linear Regression:** Extends 1D line fitting to multi-dimensional hyperplane fitting.
- **Linear Algebra (Matrix Inversion):** Requires solving $\boldsymbol{\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$.

**Enables:**
- **Ridge & Lasso Regularization:** Adds penalty terms to the MLR loss function to handle multicollinearity and high dimensions.
- **Polynomial Regression:** Creates higher-order features ($x_1^2, x_1 x_2$) and feeds them directly into MLR.
- **Neural Network Linear Layers:** A single neuron without an activation function is structurally identical to Multiple Linear Regression.

## 10. REAL-WORLD APPLICATION

**Industry Use Case:** Digital Marketing Campaign Attribution  
An e-commerce retailer wants to optimize advertising spend across multiple channels (Google Search, Meta Ads, YouTube Video).

**Implementation Workflow:**
1. **Data Collection:** Collect weekly metrics for 52 weeks recording spend in Google Search ($x_1$), Meta Ads ($x_2$), and YouTube ($x_3$), along with total weekly revenue ($y$).
2. **Model Fitting:** Train MLR to find the equation:
   $$\hat{y} = \$50,000 + 4.2 x_1 + 2.8 x_2 + 1.1 x_3$$
3. **Insight Extraction:**
   - Base weekly revenue with zero ad spend is $\$50,000$.
   - Every $\$1$ spent on Google Search generates $\$4.20$ in revenue (holding Meta and YouTube constant).
   - Every $\$1$ spent on YouTube yields only $\$1.10$.
4. **Budget Reallocation:** Shift marketing budget away from lower-ROI channels (YouTube) into higher-ROI channels (Google Search).
5. **Business Impact:** Increases total campaign revenue by $18\%$ without raising the total marketing budget.

## INTERVIEW QUESTION

**Difficulty:** Hard  
**Question:** *"What happens mathematically to the Normal Equation $\boldsymbol{\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ when two features in $\mathbf{X}$ are perfectly collinear?"*

**Expected Answer:**  
If two features are perfectly collinear, one column of matrix $\mathbf{X}$ is an exact linear combination of another. Consequently, the matrix product $\mathbf{X}^T\mathbf{X}$ loses full column rank and its determinant becomes zero ($\det(\mathbf{X}^T\mathbf{X}) = 0$). This makes $\mathbf{X}^T\mathbf{X}$ singular and non-invertible. As a result, there is no unique solution for $\boldsymbol{\beta}$; infinitely many coefficient combinations can produce the exact same minimal sum of squared errors.

## KEY TAKEAWAYS

- Fits a multi-dimensional hyperplane $\mathbf{\hat{y}} = \mathbf{X}\boldsymbol{\beta}$ using OLS.
- Solved analytically via Normal Equation: $\boldsymbol{\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$.
- Coefficients represent *partial* effects holding other variables fixed.
- Highly vulnerable to multicollinearity and $p > n$ sample sizes.
