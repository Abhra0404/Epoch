# Time Series and Forecasting

**TOPIC:** Time Series and Forecasting  
**PREREQUISITE TOPICS:** Single-Variable Calculus, Simple Linear Regression, Regression Evaluation  
**LEARNING OUTCOMES:** Define time series components (Trend, Seasonality, Noise), verify stationarity conditions, apply differencing, formulate Simple Exponential Smoothing and ARIMA$(p,d,q)$ models, and execute Walk-Forward validation without data leakage.

---

## 1. CORE CONCEPT (200-250 words)

**Time Series Forecasting** is the discipline of analyzing data points collected sequentially over uniform chronological time intervals $t \in \{1, 2, \dots, T\}$ to predict future values $y_{T+h}$.

Unlike traditional machine learning where observations are assumed to be independent and identically distributed (i.i.d.), time series data contains explicit **temporal dependency**—today's measurement ($y_t$) is strongly correlated with yesterday's measurement ($y_{t-1}$).

A time series can be decomposed into four core structural components:
1. **Trend ($T_t$):** The long-term directional movement (upward or downward) over extended periods.
2. **Seasonality ($S_t$):** Short-term, fixed-period repeating patterns driven by calendar cycles (e.g., daily electricity demand peaks, annual holiday sales).
3. **Cyclical ($C_t$):** Long-term economic fluctuations without fixed periods (e.g., multi-year recession business cycles).
4. **Residual / Noise ($R_t$):** Unpredictable, random variations remaining after removing trend and seasonality.

Forecasting algorithms require data to be **stationary**—meaning its mean, variance, and autocovariance remain constant over time. Non-stationary series must be transformed (e.g., via differencing) before modeling.

The key insight: Time Series Forecasting leverages past temporal dependencies ($y_{t-1}, y_{t-2}$) and seasonal patterns to project future trajectories while preventing temporal data leakage.

---

## 2. THE PROBLEM IT SOLVES (150-200 words)

Suppose a retail chain wants to forecast daily store inventory for the next 30 days.

If you apply **standard Machine Learning** with random 5-Fold Cross-Validation, the model randomly shuffles rows. Training data from December 25th will be used to predict sales on December 10th. This causes severe **future-to-past data leakage**—the model cheats by peering into the future, yielding unrealistically optimistic validation scores that collapse in production.

Furthermore, standard ML assumes samples are independent, completely ignoring autocorrelation and seasonal cycles.

Time Series Forecasting solves these problems. It introduces specialized time-aware validation (**Walk-Forward Backtesting**), enforces chronological sequence integrity, and explicitly models autocorrelation and seasonal patterns.

---

## 3. FORMAL DEFINITION & NOTATION (200-250 words)

### Time Series Decomposition
- **Additive Model (Constant seasonal variation):**
  $$y_t = T_t + S_t + C_t + R_t$$
- **Multiplicative Model (Seasonal variation grows with trend):**
  $$y_t = T_t \times S_t \times C_t \times R_t$$

### Weak Stationarity Conditions
A time series $y_t$ is weakly stationary if:
1. Constant Mean: $\mathbb{E}[y_t] = \mu \quad \forall t$
2. Constant Variance: $\text{Var}(y_t) = \sigma^2 \quad \forall t$
3. Autocovariance depends only on lag $k$, not time $t$: $\text{Cov}(y_t, y_{t-k}) = \gamma_k$

### First-Order Differencing ($d=1$)
$$\Delta y_t = y_t - y_{t-1}$$

### ARIMA$(p, d, q)$ Model
Combines Autoregressive $\text{AR}(p)$, Differencing $d$, and Moving Average $\text{MA}(q)$:

$$y_t' = c + \sum_{i=1}^{p} \phi_i y_{t-i}' + \sum_{j=1}^{q} \theta_j e_{t-j} + e_t$$

Where $y_t'$ is the differenced series, $\phi_i$ are AR parameters, $\theta_j$ are MA parameters, and $e_t \sim N(0, \sigma^2)$ is white noise error.

| Symbol | Meaning | Role |
|---|---|---|
| $y_t$ | Observed value at time $t$ | Sequential target variable |
| $\hat{y}_{t+h \mid t}$ | $h$-step ahead forecast from time $t$ | Predicted future trajectory |
| $p, d, q$ | ARIMA orders | $p$: AR lags, $d$: differencing order, $q$: MA residual lags |
| $\alpha$ | Smoothing parameter (SES) | Weight given to recent observations ($0 < \alpha \le 1$) |

---

## 4. INTUITION WITH VISUALS (150-200 words)

Picture a deconstructed time-series chart showing monthly ice cream sales over 5 years:

- **Top Plot (Raw Data):** Shows a rising line that zig-zags wildly up and down every summer.
- **Decomposition Sub-plots:**
  1. **Trend ($T_t$):** A smooth, upward-sloping straight line indicating overall multi-year business growth.
  2. **Seasonality ($S_t$):** A perfect, repeating wave that peaks every July (summer) and bottoms out every January (winter).
  3. **Noise ($R_t$):** Random jitter bouncing around zero (unexplained weather spikes).

Now picture **Stationarity**:
A non-stationary series looks like a drifting staircase heading uphill with changing step heights. 

Applying **First Differencing** ($\Delta y_t = y_t - y_{t-1}$) subtracts yesterday's height from today's height, transforming the drifting staircase into a flat, horizontal soundwave oscillating stably around zero.

---

## 5. WORKED EXAMPLE 1: Simple Case (300-400 words)

**Problem:**  
Calculate forecasts using **Simple Exponential Smoothing (SES)** with smoothing factor $\alpha = 0.50$ across a 3-period historical time series.

**Given:**  
- Observed historical values: $y_1 = 10$, $y_2 = 12$, $y_3 = 16$
- Initial forecast baseline at $t=1$: $\hat{y}_1 = 10$
- Smoothing factor: $\alpha = 0.50$
- SES Formula: $\hat{y}_{t+1} = \alpha y_t + (1 - \alpha) \hat{y}_t$

**Solution steps:**

01. **Calculate forecast for period $t=2$ ($\hat{y}_2$):**
    $$\hat{y}_2 = \alpha y_1 + (1 - \alpha) \hat{y}_1$$
    $$\hat{y}_2 = (0.50 \times 10) + (1 - 0.50)(10) = 5.0 + 5.0 = 10.0$$

02. **Calculate forecast for period $t=3$ ($\hat{y}_3$):**  
    Now observe actual value $y_2 = 12$:
    $$\hat{y}_3 = \alpha y_2 + (1 - \alpha) \hat{y}_2$$
    $$\hat{y}_3 = (0.50 \times 12) + (0.50 \times 10.0) = 6.0 + 5.0 = 11.0$$

03. **Calculate future 1-step ahead forecast for period $t=4$ ($\hat{y}_4$):**  
    Now observe actual value $y_3 = 16$:
    $$\hat{y}_4 = \alpha y_3 + (1 - \alpha) \hat{y}_3$$
    $$\hat{y}_4 = (0.50 \times 16) + (0.50 \times 11.0) = 8.0 + 5.5 = 13.5$$

04. **Interpret exponential weighting:**  
    Notice how SES assigns exponentially decreasing weights to older observations. Recent observation $y_3=16$ pulled the forecast up from $11.0$ to $13.5$.

**Answer:**  
The SES forecast for period $t=4$ is $\hat{y}_4 = 13.5$.

---

## 6. WORKED EXAMPLE 2: Common Variation (300-400 words)

**Problem:**  
Apply First-Order Differencing ($d=1$) to convert a non-stationary trending series into a stationary series, then compute the differenced mean.

**Given:**  
Non-stationary time series $y$ ($N=4$):
$$y = [100, 105, 112, 120]$$

**Solution steps:**

01. **Understand first differencing formula ($\Delta y_t = y_t - y_{t-1}$):**  
    Differencing removes baseline trends by tracking period-over-period changes.

02. **Compute differenced values for periods $t=2, 3, 4$:**
    - At $t=2$: $\Delta y_2 = y_2 - y_1 = 105 - 100 = +5$
    - At $t=3$: $\Delta y_3 = y_3 - y_2 = 112 - 105 = +7$
    - At $t=4$: $\Delta y_4 = y_4 - y_3 = 120 - 112 = +8$

03. **Formulate the differenced series $\Delta y$:**
    $$\Delta y = [5, 7, 8] \quad (N'=3)$$

04. **Compute mean of the differenced series ($\bar{\Delta y}$):**
    $$\bar{\Delta y} = \frac{5 + 7 + 8}{3} = \frac{20}{3} \approx 6.67$$

05. **Construct a 1-step ahead naive forecast for $y_5$ using the differenced mean:**
    $$y_5 = y_4 + \bar{\Delta y} = 120 + 6.67 = 126.67$$

**Answer:**  
The differenced stationary series is $\Delta y = [5, 7, 8]$, predicting $y_5 = 126.67$.

---

## 7. COMMON MISTAKES (100-150 words)

❌ **MISTAKE:** Evaluating time series models using standard random $K$-Fold Cross-Validation.  
✅ **FIX:** Use **Walk-Forward Validation (TimeSeriesSplit)** where training sets strictly precede validation sets in chronological order.  
**WHY:** Random $K$-Fold shuffles time, leaking future data into past training folds, resulting in fake near-perfect validation scores that fail in production.

❌ **MISTAKE:** Fitting ARIMA models directly on raw, non-stationary time series data without differencing.  
✅ **FIX:** Perform an **Augmented Dickey-Fuller (ADF) test** to check for unit roots; apply differencing ($d=1$ or $d=2$) until $p\text{-value} < 0.05$.  
**WHY:** Non-stationary data causes spurious regression, where independent trends falsely appear correlated.

---

## 8. WHEN TO USE (vs. When NOT to Use) (150-200 words)

**When to Use:**
- Data observations are chronologically ordered over continuous regular time intervals.
- The goal is projecting future trajectories ($y_{t+h}$) based on historical patterns, seasonality, and lags.
- Financial stock pricing, retail demand planning, electricity grid loading, and web traffic forecasting.

**When NOT to Use:**
- Data sample order does not matter (independent i.i.d. observations).
- Time steps are irregular or missing massive un-trackable gaps without proper resampling.

**The Boundary:**  
If target $y_t$ depends on past values ($y_{t-1}, y_{t-2}$) or seasonal cycles, use **Time Series Forecasting**. If observations are independent cross-sectional samples, use standard **Regression**.

---

## 9. CONNECTIONS TO OTHER TOPICS (100-150 words)

**Builds on:**
- **Simple Linear Regression:** Serves as the basis for deterministic trend fitting.
- **Regression Evaluation (RMSE, MAE):** Adapts evaluation metrics to time series forecasts (adding MAPE and MASE).

**Enables:**
- **ARIMA / SARIMAX:** Modeling autoregressive, moving average, and exogenous variables.
- **Prophet & Holt-Winters:** Decomposable additive models with seasonal trend adjustments.
- **Deep Temporal Models (LSTM, GRU, Temporal Fusion Transformers):** Using deep learning for multi-horizon time series forecasting.

---

## 10. REAL-WORLD APPLICATION (200-250 words)

**Industry Use Case:** E-Commerce Supply Chain Demand Forecasting  
A global retailer forecasts daily unit demand for 100,000 products to optimize warehouse replenishment.

**Implementation Workflow:**
1. **Data Ingestion:** Pull daily sales histories over 3 years ($T = 1,095$ days) for each product SKU.
2. **Feature Engineering:** Create lagged features ($y_{t-1}, y_{t-7}, y_{t-365}$), rolling 7-day moving averages, and holiday indicator flags.
3. **Stationarity & Transformation:** Perform ADF test; apply log-transform and 7-day seasonal differencing to remove annual trends.
4. **Validation:** Implement a 6-month **Walk-Forward Backtesting** window to evaluate 14-day ahead forecast accuracy.
5. **Model Evaluation:** Measure performance using Mean Absolute Scaled Error ($\text{MASE} = 0.78$).
6. **Business Impact:** Prevents over-stocking and stockouts, reducing warehouse holding costs by $\$12$ million annually while improving order fulfillment rates to $99.2\%$.

---

## INTERVIEW QUESTION (100-150 words)

**Difficulty:** Hard  
**Question:** *"Why is standard K-Fold Cross-Validation mathematically invalid for time series data, what is Stationarity, and how does the Augmented Dickey-Fuller (ADF) test verify it?"*

**Expected Answer:**  
Standard $K$-Fold Cross-Validation is invalid because it shuffles data randomly, creating **temporal data leakage** where future information ($y_{t+1}$) leaks into past training sets ($y_t$), violating chronological ordering. **Stationarity** means a series' statistical properties (mean, variance, autocovariance) are constant over time. The **Augmented Dickey-Fuller (ADF) test** tests for the presence of a unit root (null hypothesis $H_0$: series is non-stationary). An ADF $p\text{-value} < 0.05$ rejects $H_0$, confirming stationarity. If $p \ge 0.05$, differencing ($d=1$) must be applied to make the series stationary before modeling.

---

## KEY TAKEAWAYS (50 words max)

- Models sequential, chronologically ordered data ($y_t$).
- **Decomposition:** Trend ($T_t$), Seasonality ($S_t$), Noise ($R_t$).
- **Stationarity:** Constant mean, variance, and autocovariance over time.
- **Differencing ($d=1$):** Converts non-stationary trends into stationary series.
- **Validation:** Must use Walk-Forward splits (TimeSeriesSplit) to prevent data leakage.
