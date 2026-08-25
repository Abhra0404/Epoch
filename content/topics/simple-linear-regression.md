# Simple Linear Regression

**TOPIC:** Simple Linear Regression  
**PREREQUISITE TOPICS:** High School Algebra, Cartesian Coordinate Plane, Basic Mean & Variance  
**LEARNING OUTCOMES:** Understand Ordinary Least Squares (OLS), calculate the optimal slope and intercept by hand, calculate residuals, and make predictions on new data.

## 1. CORE CONCEPT

Simple Linear Regression is a fundamental statistical method used to model and predict the relationship between two continuous numeric variables: one input and one output. 

Imagine you are pinning a taut piece of string across a board covered in pushpins. Each pushpin represents a real observation you made in the world. As you tilt and shift the string, you try to position it so that it passes as close to as many pushpins as possible simultaneously. Some pins sit slightly above the string, some sit below, but the string captures the overall upward or downward trend across the board.

In machine learning, the string is your **linear model** (a straight line), the horizontal location of each pin is the **feature** (input), and the vertical position is the **target** (output). When you use Simple Linear Regression, you assume that changes in your input directly produce a proportional, straight-line change in your output.

Rather than guessing where to place the line, the algorithm mathematically calculates the single best position that balances the line across all data points at once.

The key insight: Simple Linear Regression finds the unique straight line that minimizes the collective vertical distance between your actual data points and your predictions.

## 2. THE PROBLEM IT SOLVES

Suppose you are a student trying to predict your final exam score based on the number of hours you study each week. 

If you take a **naive approach**, you might simply calculate the average exam score of all previous students (say, 70%). However, this completely ignores how hard any individual studied. A student studying 15 hours gets predicted the same 70% as a student studying 1 hour. Alternatively, you might draw a line connecting only the student with the lowest study hours to the student with the highest. This fails because a single unusual student (an outlier) distorts your entire rule for everyone else.

Simple Linear Regression solves this by using every data point simultaneously. It determines the baseline score you would get with zero study hours and calculates exactly how many marks each additional study hour adds on average, giving you a reliable and personalized prediction.

## 3. FORMAL DEFINITION & NOTATION

Simple Linear Regression expresses the relationship between an independent variable $x$ and a dependent variable $y$ through a linear equation:

$$\hat{y}_i = \beta_0 + \beta_1 x_i$$

Where:
- $\hat{y}_i$ is the predicted value for the $i$-th observation.
- $\beta_0$ is the **$y$-intercept** (the value of $\hat{y}$ when $x = 0$).
- $\beta_1$ is the **slope coefficient** (the change in $\hat{y}$ for a 1-unit increase in $x$).

| Symbol | Meaning | Example |
|---|---|---|
| $x_i$ | Input feature (independent variable) | Hours studied ($3\text{ hrs}$) |
| $y_i$ | Actual observed target | Actual test mark ($75\%$) |
| $\hat{y}_i$ | Predicted target value | Predicted mark ($73.5\%$) |
| $e_i$ | Residual error ($y_i - \hat{y}_i$) | Error ($+1.5\%$) |
| $\bar{x}, \bar{y}$ | Mean of $x$ and mean of $y$ | Average hours, average marks |

To find the optimal values of $\beta_0$ and $\beta_1$, we use **Ordinary Least Squares (OLS)**, which minimizes the Sum of Squared Residuals ($SSR = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$):

$$\beta_1 = \frac{\sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n} (x_i - \bar{x})^2}$$

$$\beta_0 = \bar{y} - \beta_1 \bar{x}$$

## 4. INTUITION WITH VISUALS

Imagine a two-dimensional scatter plot where the horizontal $x$-axis represents study hours (from $0$ to $10$) and the vertical $y$-axis represents exam scores (from $0$ to $100$).

You plot individual student scores as dots scattered across the plane. As study hours increase, the dots generally drift upward toward the top right, but they do not form a perfectly straight line.

Now picture drawing a straight ruler through this cloud of dots. From every single dot, imagine dropping a vertical dashed line straight to the ruler. The length of that vertical dashed line is the **residual error** ($e_i$). If a dot is above the ruler, the error is positive; if below, negative.

Next, imagine attaching a physical cardboard square to each dashed line, where the area of the square equals $(\text{error})^2$. Ordinary Least Squares pivots and slides the ruler until the combined surface area of all these cardboard squares across all points reaches the absolute minimum possible size.

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Fit a Simple Linear Regression line using Ordinary Least Squares to predict exam marks ($y$) from study hours ($x$), then predict the score for a student who studies $4$ hours.

**Given:**  
A dataset of $n = 3$ students:
- Student 1: $(x_1, y_1) = (1, 2)$
- Student 2: $(x_2, y_2) = (2, 3)$
- Student 3: $(x_3, y_3) = (3, 7)$

**Solution steps:**

01. **Calculate the means ($\bar{x}$ and $\bar{y}$):**
    $$\bar{x} = \frac{1 + 2 + 3}{3} = \frac{6}{3} = 2$$
    $$\bar{y} = \frac{2 + 3 + 7}{3} = \frac{12}{3} = 4$$

02. **Calculate deviations and the denominator $\sum (x_i - \bar{x})^2$:**
    - For $x_1 = 1$: $(1 - 2) = -1 \implies (-1)^2 = 1$
    - For $x_2 = 2$: $(2 - 2) = 0 \implies (0)^2 = 0$
    - For $x_3 = 3$: $(3 - 2) = 1 \implies (1)^2 = 1$
    $$\sum (x_i - \bar{x})^2 = 1 + 0 + 1 = 2$$

03. **Calculate cross-deviations and the numerator $\sum (x_i - \bar{x})(y_i - \bar{y})$:**
    - For point 1: $(1 - 2)(2 - 4) = (-1)(-2) = 2$
    - For point 2: $(2 - 2)(3 - 4) = (0)(-1) = 0$
    - For point 3: $(3 - 2)(7 - 4) = (1)(3) = 3$
    $$\sum (x_i - \bar{x})(y_i - \bar{y}) = 2 + 0 + 3 = 5$$

04. **Compute slope ($\beta_1$) and intercept ($\beta_0$):**
    $$\beta_1 = \frac{5}{2} = 2.5$$
    $$\beta_0 = \bar{y} - \beta_1 \bar{x} = 4 - (2.5 \times 2) = 4 - 5 = -1$$
    **Regression Line:** $\hat{y} = -1 + 2.5x$

05. **Predict for $x = 4$ hours:**
    $$\hat{y} = -1 + 2.5(4) = -1 + 10 = 9$$

**Answer:**  
The fitted line is $\hat{y} = -1 + 2.5x$. A student studying $4$ hours is predicted to score $9$ marks.

## 6. WORKED EXAMPLE 2: Common Variation

**Problem:**  
Fit a regression line where the relationship is negative (an inverse relationship): predicting hours of sleep ($y$) based on hours of late-night screen time ($x$).

**Given:**  
A dataset of $n = 3$ observations:
- Day 1: $(x_1, y_1) = (1, 8)$
- Day 2: $(x_2, y_2) = (2, 6)$
- Day 3: $(x_3, y_3) = (3, 1)$

**Solution steps:**

01. **Calculate the means ($\bar{x}$ and $\bar{y}$):**
    $$\bar{x} = \frac{1 + 2 + 3}{3} = 2$$
    $$\bar{y} = \frac{8 + 6 + 1}{3} = \frac{15}{3} = 5$$

02. **Calculate squared deviations for $x$:**
    - Deviations $(x_i - \bar{x})$: $-1, 0, 1$
    - Squared deviations: $(-1)^2 + 0^2 + 1^2 = 2$
    $$\sum (x_i - \bar{x})^2 = 2$$

03. **Calculate numerator (cross-products of deviations):**
    - Deviations $(y_i - \bar{y})$: $(8-5)=3,\ (6-5)=1,\ (1-5)=-4$
    - Products:
      - Point 1: $(-1) \times 3 = -3$
      - Point 2: $0 \times 1 = 0$
      - Point 3: $1 \times (-4) = -4$
    $$\sum (x_i - \bar{x})(y_i - \bar{y}) = -3 + 0 + (-4) = -7$$

04. **Compute slope ($\beta_1$) and intercept ($\beta_0$):**
    $$\beta_1 = \frac{-7}{2} = -3.5$$
    $$\beta_0 = \bar{y} - \beta_1 \bar{x} = 5 - (-3.5 \times 2) = 5 + 7 = 12$$
    **Regression Line:** $\hat{y} = 12 - 3.5x$

05. **Highlighting the difference from Example 1:**  
    Unlike Example 1 where $\beta_1 > 0$ indicated positive growth, here $\beta_1 = -3.5 < 0$. This negative sign indicates that for every $1$ additional hour of screen time, expected sleep drops by $3.5$ hours.

**Answer:**  
The model is $\hat{y} = 12 - 3.5x$. Base sleep with zero screen time is $12$ hours.

## 7. COMMON MISTAKES

❌ **MISTAKE:** Assuming correlation implies causation (e.g., concluding that forcing a student to sit for 10 hours *causes* their mark to hit 100%).  
✅ **FIX:** Treat linear regression as an observational association tool, not proof of cause-and-effect.  
**WHY:** Unobserved confounding variables (like student motivation or prior background) may drive both features.

❌ **MISTAKE:** Extrapolating predictions far outside the range of training data (e.g., predicting score for $x = 50$ study hours).  
✅ **FIX:** Restrict predictions to the interpolation range ($x_{\min} \le x \le x_{\max}$).  
**WHY:** Real-world linear trends saturate, level off, or change curvature outside observed bounds.

## 8. WHEN TO USE (vs. When NOT to Use)

**When to Use:**
- You want to predict a continuous numerical value using a single continuous feature.
- Visual inspection of a scatter plot confirms a clear linear trend.
- Model interpretability is critical (stakeholders need to understand the exact numerical effect of the slope).
- You need a fast, low-compute baseline model.

**When NOT to Use:**
- The relationship is non-linear (e.g., exponential growth or U-shaped curves).
- The target output is categorical (e.g., predicting "Pass" vs. "Fail"—use Logistic Regression instead).
- Your dataset contains severe unhandled outliers that disproportionately pull the OLS line.

**The Boundary:**  
Check your **residual plot** (residuals plotted against fitted values). If residuals scatter randomly around zero with constant width, Linear Regression is appropriate. If you see a curved or trumpet-like funnel shape, the linear assumption is violated.

## 9. CONNECTIONS TO OTHER TOPICS

**Builds on:**
- **Cartesian Coordinates & Slope-Intercept Equation:** Uses $y = mx + c$ geometry as the primary predictive architecture.
- **Covariance and Variance:** The slope formula $\beta_1$ is directly equivalent to sample covariance divided by sample variance ($\frac{\text{Cov}(x,y)}{\text{Var}(x)}$).

**Enables:**
- **Multiple Linear Regression:** Expands the input dimension from a single feature $x$ to a vector of features $(x_1, x_2, \dots, x_p)$.
- **Gradient Descent:** Serves as the primary toy problem for learning iterative loss optimization algorithms.
- **Logistic Regression:** Uses the same linear combination $\beta_0 + \beta_1 x$ and wraps it inside a sigmoid function for probability classification.

## 10. REAL-WORLD APPLICATION

**Industry Use Case:** Real Estate Rental Price Estimation  
A property technology platform wants to provide instant rental estimates based on apartment floor area.

**Implementation Workflow:**
1. **Data Collection:** The team pulls recent lease records for 1-bedroom apartments in a specific neighborhood, extracting square footage ($x$) and monthly rent ($y$).
2. **Model Training:** Using OLS, the system fits historical records and learns:
   $$\hat{y} = 450 + 1.75x$$
3. **Metric Evaluation:** The model achieves a Root Mean Squared Error (RMSE) of $\$65$, meaning predictions are typically within $\$65$ of actual market rates.
4. **Production Deployment:** When a landlord enters an apartment size of $800\text{ sq ft}$, the backend calculates:
   $$\hat{y} = 450 + 1.75(800) = 450 + 1400 = \$1,850/\text{month}$$
5. **Business Value:** The base intercept ($\$450$) represents fixed neighborhood amenity costs, while the slope ($\$1.75$) transparently shows the exact value of each additional square foot to both renters and property owners.

## INTERVIEW QUESTION

**Difficulty:** Medium  
**Question:** *"Why does Ordinary Least Squares minimize the sum of squared vertical errors instead of the sum of absolute errors ($|y - \hat{y}|$) or perpendicular distances?"*

**Expected Answer:**  
OLS minimizes vertical errors because $x$ is assumed to be an error-free independent variable, making prediction error exist strictly along the $y$-axis. Squaring the errors rather than taking absolute values provides two key advantages: it penalizes large errors disproportionately, and mathematically, the squared loss function is continuously differentiable everywhere, allowing us to derive closed-form analytical solutions ($\beta_1, \beta_0$) without iterative optimization.

## KEY TAKEAWAYS

- Fits a straight line $\hat{y} = \beta_0 + \beta_1 x$ by minimizing squared vertical gaps.
- Slope $\beta_1$ equals $\frac{\text{Cov}(x,y)}{\text{Var}(x)}$; intercept $\beta_0$ is $\bar{y} - \beta_1\bar{x}$.
- Highly interpretable baseline; sensitive to outliers and non-linear patterns.
